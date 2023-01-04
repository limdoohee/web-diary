import Task from "./Task";
import styled from "styled-components";
import Diary from "../components/Diary";
import { db } from "../Firebase/Firebase";
import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
} from "firebase/firestore";
import { clickDateState, loadData } from "../recoil/atoms";
import { useRecoilValue, useRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  > div {
    &:nth-child(1) {
      padding-top: 0.2em;
      padding-bottom: 1.66em;
      border-bottom: 1px solid #ddd;
    }
  }
`;

const Date = styled.h1`
  text-align: center;
  font-size: 1.75em;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 300;
`;

const Detail = () => {
  const [data, setData] = useRecoilState(loadData);
  const clickDate = useRecoilValue(clickDateState);
  console.log(data);

  const addHandler = async (newData) => {
    try {
      await addDoc(collection(db, "date"), {
        start: clickDate,
        ...(newData.title && { title: newData.title }),
        ...(newData.diary && { diary: newData.diary }),
      }).then((res) => {
        setData([
          ...data,
          {
            id: res.id,
            start: clickDate,
            ...(newData.title && { title: newData.title, color: "#A3BB98" }),
            ...(newData.diary && {
              diary: newData.diary,
              color: "#FBC252",
              className: "fc-diary",
            }),
          },
        ]);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateHandler = async (newData) => {
    console.log(newData);
    try {
      await updateDoc(doc(db, "date", newData.id), {
        start: clickDate,
        ...(newData.title && { title: newData.title }),
        ...(newData.diary && { diary: newData.diary }),
      }).then((res) => {
        // const temp = [...data].map((e) => {
        //   if (e.id === newData.id) {
        //     if (newData.title) e.title = newData.title;
        //     if (newData.diary) e.diary = newData.diary;
        //   }
        //   return e;
        // });
        console.log(
          [...data].map((e) => {
            if (e.id === newData.id) {
              if (newData.title) e.title = newData.title;
              if (newData.diary) e.diary = newData.diary;
            }
            return e;
          })
        );
        setData([
          {
            diary: "mdmsmdmf",
            start: "2022-12-30",
            id: "5Krf1GpaAxK0qptigt5o",
            color: "#FBC252",
            className: "fc-diary",
          },
        ]);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteHandler = async (newData) => {
    try {
      await deleteDoc(doc(db, "date", newData.id)).then((res) => {
        setData(data.filter((e) => e.id !== newData.id));
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const saveHandler = async (newData, type) => {
    try {
      switch (type) {
        case "add":
          addHandler(newData);
          break;
        case "update":
          updateHandler(newData);
          break;
        case "delete":
          deleteHandler(newData);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Wrapper>
      <div>
        <Date>{clickDate}</Date>
      </div>
      <div>
        <Task saveHandler={saveHandler} />
        <Diary saveHandler={saveHandler} />
      </div>
    </Wrapper>
  );
};

export default Detail;

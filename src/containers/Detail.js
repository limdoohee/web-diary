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
import { clickDateState, userUID } from "../recoil/atoms";
import { loadData } from "../recoil/selector";
import { useRecoilValue, useRecoilState } from "recoil";
import { message } from "antd";

const Wrapper = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  border-left: 1px solid #eee;
  padding: 0 2.5%;
  > div {
    &:nth-child(1) {
      margin: 2.2em 0 1.5em;
    }
  }
`;

const Date = styled.h1`
  text-align: center;
  font-size: 1.5em;
  color: #808080;
  font-weight: 100;
`;

const ContentsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const Detail = () => {
  const [data, setData] = useRecoilState(loadData);
  const clickDate = useRecoilValue(clickDateState);
  const userID = useRecoilValue(userUID);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: `successfully ${message}!`,
      duration: 2,
    });
  };

  const addHandler = async (newData) => {
    try {
      await addDoc(collection(db, `data/${userID}/list`), {
        ...(newData.start ? { start: newData.start } : { start: clickDate }),
        ...(newData.end && { end: newData.end }),
        ...(newData.title && { title: newData.title }),
        ...(newData.diary && { diary: newData.diary }),
      }).then((res) => {
        success("saved");
        setData([
          ...data,
          {
            id: res.id,
            ...(newData.start
              ? { start: newData.start }
              : { start: clickDate }),
            ...(newData.end && { end: newData.end }),
            ...(newData.title && { title: newData.title, color: "#A3BB98" }),
            ...(newData.diary && {
              diary: newData.diary,
              color: "#FBC252",
              className: "fc-diary",
              display: "list-item",
            }),
          },
        ]);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateHandler = async (newData) => {
    try {
      await updateDoc(doc(db, `data/${userID}/list`, newData.id), {
        ...(newData.start ? { start: newData.start } : { start: clickDate }),
        ...(newData.end && { end: newData.end }),
        ...(newData.title && { title: newData.title }),
        ...(newData.diary && { diary: newData.diary }),
      }).then((res) => {
        success("updated");
        setData([
          ...data.filter((e) => e.id !== newData.id),
          {
            id: newData.id,
            ...(newData.start
              ? { start: newData.start }
              : { start: clickDate }),
            ...(newData.end && { end: newData.end }),
            ...(newData.title && { title: newData.title, color: "#A3BB98" }),
            ...(newData.diary && {
              diary: newData.diary,
              color: "#FBC252",
              className: "fc-diary",
              display: "list-item",
            }),
          },
        ]);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteHandler = async (newData) => {
    try {
      await deleteDoc(doc(db, `data/${userID}/list`, newData.id)).then(
        (res) => {
          success("deleted");
          setData(data.filter((e) => e.id !== newData.id));
        }
      );
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
      {contextHolder}
      <div>
        <Date>{clickDate}</Date>
      </div>
      <ContentsWrapper>
        <Task saveHandler={saveHandler} />
        <Diary saveHandler={saveHandler} />
      </ContentsWrapper>
    </Wrapper>
  );
};

export default Detail;

import { useEffect, useState } from "react";
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

const Detail = ({ clickeDate, data, changeData }) => {
  const diaryData = data.filter((e) => e.diary);
  const [diary, setDiary] = useState(false);

  useEffect(() => {
    diaryData.length > 0 ? setDiary(diaryData) : setDiary(false);
  }, [data]);

  const addHandler = async (data) => {
    console.log(data);
    await addDoc(collection(db, "date"), {
      start: clickeDate,
      ...(data.title && { title: data.title }),
      ...(data.diary && { diary: data.diary }),
    }).then((res) => {
      changeData(
        {
          id: res.id,
          start: clickeDate,
          ...(data.title && { title: data.title, color: "#A3BB98" }),
          ...(data.diary && {
            diary: data.diary,
            color: "#FBC252",
            className: "fc-diary",
          }),
        },
        "add"
      );
    });
  };

  const updateHandler = async (data) => {
    await updateDoc(doc(db, "date", data.id), {
      start: clickeDate,
      ...(data.title && { title: data.title }),
      ...(data.diary && { diary: data.diary }),
    }).then(
      changeData(
        {
          id: data.id,
          start: clickeDate,
          ...(data.title && { title: data.title }),
          ...(data.diary && { diary: data.diary }),
        },
        "update"
      )
    );
  };

  const deleteHandler = async (data) => {
    try {
      await deleteDoc(doc(db, "date", data.id)).then(
        changeData({ id: data.id }, "delete")
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const saveHandler = async (data, type) => {
    try {
      switch (type) {
        case "add":
          addHandler(data);
          break;
        case "update":
          updateHandler(data);
          break;
        case "delete":
          deleteHandler(data);
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
        <Date>{clickeDate}</Date>
      </div>
      <div>
        <Task data={data} saveHandler={saveHandler} />
        <Diary data={diary} saveHandler={saveHandler} />
      </div>
    </Wrapper>
  );
};

export default Detail;

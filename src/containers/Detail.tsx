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
import { message, Tabs } from "antd";
import type { TabsProps } from "antd";
import { SaveDataType } from "@/types";

const Wrapper = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  border-left: 1px solid #eee;
  padding: 0 2.5%;
  > div {
    &:nth-child(1) {
      padding: 1.9em 0 1.2em;
    }
  }
`;

const Date = styled.h1`
  text-align: center;
  font-size: 1.5em;
  color: #808080;
  font-weight: 100;
`;

const Detail = () => {
  const [data, setData] = useRecoilState(loadData);
  const clickDate = useRecoilValue(clickDateState);
  const userID = useRecoilValue(userUID);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: `successfully ${message}!`,
      duration: 2,
    });
  };

  const addHandler = async (newData: SaveDataType) => {
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
            ...(newData.diary
              ? {
                  diary: newData.diary,
                  color: "#FBC252",
                  className: "fc-diary",
                  display: "list-item",
                  title: "일기",
                }
              : {
                  title: newData.title,
                  color: "#A3BB98",
                }),
          },
        ]);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateHandler = async (newData: SaveDataType) => {
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
            ...(newData.diary
              ? {
                  diary: newData.diary,
                  color: "#FBC252",
                  className: "fc-diary",
                  display: "list-item",
                  title: "일기",
                }
              : {
                  title: newData.title,
                  color: "#A3BB98",
                }),
          },
        ]);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteHandler = async (newData: SaveDataType) => {
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

  const saveHandler = async (newData: SaveDataType, type: string) => {
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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Task`,
      children: <Task saveHandler={saveHandler} />,
    },
    {
      key: "2",
      label: `Diary`,
      children: <Diary saveHandler={saveHandler} />,
    },
  ];

  return (
    <Wrapper>
      {contextHolder}
      <div>
        <Date>{clickDate}</Date>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </Wrapper>
  );
};

export default Detail;

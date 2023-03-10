import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { diaryDataState } from "../recoil/selector";
import { useRecoilValue } from "recoil";
import { Button, message } from "antd";

const Editor = styled.textarea`
  resize: none;
  height: calc(100% - 6em);
  width: -webkit-fill-available;
  padding: 1em;
  margin-bottom: 1em;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0.2em;
  &:focus {
    outline: 1px solid #ddd;
  }
`;

const Diary = ({ saveHandler }) => {
  const diaryData = useRecoilValue(diaryDataState);
  const [contents, setContents] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const contentsRef = useRef();

  useEffect(() => {
    diaryData ? setContents(diaryData.diary) : setContents("");
  }, [diaryData]);

  const changeHandler = (e) => {
    setContents(e.target.value);
  };

  const clickHandler = () => {
    if (contents.trim() === "") {
      messageApi.open({
        type: "warning",
        content: "Please, enter your diary",
        duration: 2,
      });
      contentsRef.current.focus();
    } else {
      diaryData
        ? saveHandler({ id: diaryData.id, diary: contents }, "update")
        : saveHandler({ diary: contents }, "add");
    }
  };
  return (
    <>
      {contextHolder}
      <Editor value={contents} onChange={changeHandler} ref={contentsRef} />
      <Button onClick={clickHandler} style={{ float: "right" }}>
        Save
      </Button>
    </>
  );
};

export default Diary;

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Header } from "../style/global";
import { diaryDataState } from "../recoil/selector";
import { useRecoilValue } from "recoil";
import { SaveOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

const Title = styled.h1`
  font-size: 1em;
  color: #808080;
  font-weight: 100;
`;

const Editor = styled.textarea`
  resize: none;
  height: 16em;
  width: -webkit-fill-available;
  padding: 1em;
  margin: 1em 1em 3em;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0.2em;
  &:focus {
    outline: 1px solid #ddd;
  }
`;

const DiaryWrapper = styled.li``;

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
    <DiaryWrapper>
      {contextHolder}
      <Header>
        <Title>Diary</Title>
        <Button shape="circle" icon={<SaveOutlined />} onClick={clickHandler} />
      </Header>
      <Editor value={contents} onChange={changeHandler} ref={contentsRef} />
    </DiaryWrapper>
  );
};

export default Diary;

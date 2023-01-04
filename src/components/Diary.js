import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../style/global";
import { diaryDataState } from "../recoil/selector";
import { useRecoilState } from "recoil";

const Title = styled.h1`
  font-size: 1.75em;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 300;
`;

const Editor = styled.textarea`
  border:  ${({ isEditDiary }) => (isEditDiary ? "1px solid #ddd" : "none")}};
  resize: none;
  height: 150px;
`;

const Diary = ({ saveHandler }) => {
  const [diaryData, setDiaryData] = useRecoilState(diaryDataState);
  const [contents, setContents] = useState("");

  useEffect(() => {
    diaryData ? setContents(diaryData.diary) : setContents("");
  }, [diaryData]);

  const changeHandler = (e) => {
    setContents(e.target.value);
  };

  const clickHandler = () => {
    diaryData
      ? saveHandler({ id: diaryData.id, diary: contents }, "update")
      : saveHandler({ diary: contents }, "add");
  };
  return (
    <>
      <Header>
        <Title>Diary</Title>
        <button onClick={clickHandler}>저장</button>
      </Header>
      <Editor value={contents} onChange={changeHandler} />
    </>
  );
};

export default Diary;

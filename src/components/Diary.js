import { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../style/global";

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

const Diary = ({ data, saveHandler }) => {
  const [contents, setContents] = useState("");
  useEffect(() => {
    data ? setContents(data[0].diary) : setContents("");
  }, [data]);

  const changeHandler = (e) => {
    setContents(e.target.value);
    // diaryChangeHandler(e.target.value);
  };

  const clickHandler = () => {
    data
      ? saveHandler({ id: data[0].id, diary: contents }, "update")
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

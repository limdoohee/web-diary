import { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../style/global";
import { diaryDataState } from "../recoil/selector";
import { useRecoilValue } from "recoil";
import { CiCirclePlus, CiSaveDown1 } from "react-icons/ci";

const Title = styled.h1`
  font-size: 1.75em;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 300;
`;

const Editor = styled.textarea`
  resize: none;
  height: 150px;
  width: -webkit-fill-available;
  padding: 1em;
  margin: 1em;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0.2em;
  &:focus {
    outline: 1px solid #ddd;
  }
`;

const Diary = ({ saveHandler }) => {
  const diaryData = useRecoilValue(diaryDataState);
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
        {contents ? <CiSaveDown1 onClick={clickHandler} /> : <CiCirclePlus />}
      </Header>
      <Editor value={contents} onChange={changeHandler} />
    </>
  );
};

export default Diary;

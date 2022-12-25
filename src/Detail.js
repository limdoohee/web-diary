import List from "./List";
import styled from "styled-components";
import Diary from "./Diary";
import { useState } from "react";
import { db } from "./Firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";

const Wrapper = styled.div`
  border-left: 1px solid #ddd;
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

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.3em;
`;

const Button = styled.button`
  border: 1px solid #ddd;
  border-radius: 0.1em;
  padding: 1em;
  flex: 1;
  margin: 0.3em;
  cursor: pointer;
`;

const NewList = styled.div``;

const Detail = ({ clickeDate, data }) => {
  const isDiary = data.filter((e) => e.diary);
  const [isEditDiary, setIsEditDiary] = useState(false);
  const [isAddList, setIsAddList] = useState(false);

  const [title, setTitle] = useState("");

  const addList = () => {
    setIsAddList(!isAddList);
  };

  const addDiary = () => {
    setIsEditDiary(!isEditDiary);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const addHandler = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "date"), {
        title: title,
        start: clickeDate,
      });
      console.log("Document written with ID: ", docRef, docRef.id);
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
        <List data={data} />
        {isDiary.length > 0 && (
          <Diary data={isDiary} isEditDiary={isEditDiary} bgColor="red" />
        )}
        {isAddList && (
          <NewList>
            <input
              type="text"
              value={title}
              placeholder="일정 입력"
              required
              onChange={changeTitle}
            />
          </NewList>
        )}
      </div>
      <BtnWrapper>
        {isAddList ? (
          <>
            <Button onClick={addHandler}>저장</Button>
          </>
        ) : (
          <>
            <Button onClick={addList}>일정 추가</Button>
            <Button onClick={addDiary}>
              {isDiary.length > 0 ? "일기 수정" : "일기 추가"}
            </Button>
          </>
        )}
      </BtnWrapper>
    </Wrapper>
  );
};

export default Detail;

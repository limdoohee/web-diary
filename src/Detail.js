import List from "./List";
import styled from "styled-components";
// import Diary from "./Diary";
import { useState, useEffect } from "react";
import { db } from "./Firebase/Firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

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

const NewDiary = styled.div`
  h1 {
    font-size: 1.75em;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 300;
  }
  textarea {
    border: 1px solid #ddd;
    resize: none;
  }
`;

const NewList = styled.div``;

const Detail = ({ clickeDate, data, changeData, deleteData }) => {
  const isDiary = data.filter((e) => e.diary);
  const [isEditDiary, setIsEditDiary] = useState(false);
  const [isAddList, setIsAddList] = useState(false);

  const [title, setTitle] = useState("");
  const [diary, setDiary] = useState("");

  useEffect(() => {
    isDiary.length > 0 && setDiary(isDiary[0].diary);
  }, [changeData]);

  const addList = () => {
    setIsAddList(!isAddList);
  };

  const addDiary = () => {
    setIsEditDiary(!isEditDiary);
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeDiary = (e) => {
    setDiary(e.target.value);
  };

  const addHandler = async (e) => {
    e.preventDefault();

    try {
      const docRef =
        isDiary.length > 0
          ? await updateDoc(doc(db, "date", isDiary[0].id), {
              start: clickeDate,
              ...(isAddList && { title: title }),
              ...(isEditDiary && { diary: diary }),
            })
          : await addDoc(collection(db, "date"), {
              id: Math.random().toString(36).substring(2),
              start: clickeDate,
              ...(isAddList && { title: title }),
              ...(isEditDiary && { diary: diary }),
            });
      changeData({
        id: Math.random().toString(36).substring(2),
        title: title,
        start: clickeDate,
      });
      setIsAddList(false);
      setIsEditDiary(false);
      setDiary("");
      setTitle("");
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();

    setIsAddList(false);
    setIsEditDiary(false);
  };

  return (
    <Wrapper>
      <div>
        <Date>{clickeDate}</Date>
      </div>
      <div>
        <List data={data} deleteData={deleteData} />
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

        {isDiary.length > 0 && (
          <NewDiary>
            <h1>Diary</h1>
            <textarea
              value={diary}
              // isEditDiary={isEditDiary}
              onChange={changeDiary}
            />
          </NewDiary>
        )}
        {isDiary.length === 0 && isEditDiary && (
          <NewDiary>
            <h1>Add Diary</h1>
            <textarea
              value={diary}
              placeholder="여기는 아무도 없어요"
              onChange={changeDiary}
            />
          </NewDiary>
        )}
      </div>
      <BtnWrapper>
        {isAddList || isEditDiary ? (
          <>
            <Button onClick={addHandler}>저장</Button>
            <Button onClick={cancelHandler}>취소</Button>
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

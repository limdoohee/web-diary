import { useState, useEffect } from "react";
import styled from "styled-components";
import TaskDetail from "../components/TaskDetail";
import { Header } from "../style/global";

const Title = styled.h1`
  font-size: 1.75em;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 300;
`;

const Item = ({ data, saveHandler }) => {
  const [isAdd, setIsAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  // const newTaskRef = useRef();

  useEffect(() => {
    setIsAdd(false);
    setNewTitle("");
  }, [data]);

  const newTaskAddHandler = () => {
    setIsAdd(true);
    // newTaskRef.current.focus();
  };

  const changeHandler = (e) => {
    setNewTitle(e.target.value);
  };

  const clickHandler = () => {
    saveHandler({ title: newTitle }, "add").then(setIsAdd(!isAdd));
  };

  const cancelHandler = () => {
    setIsAdd(false);
  };

  return (
    <>
      <Header>
        <Title>Task</Title>
        {!isAdd && <button onClick={newTaskAddHandler}>+</button>}
      </Header>
      {isAdd && (
        <>
          <input
            type="text"
            value={newTitle}
            // ref={newTaskRef}
            placeholder="일정 입력"
            required
            onChange={changeHandler}
          />
          <button onClick={clickHandler}>저장</button>
          <button onClick={cancelHandler}>취소</button>
        </>
      )}
      {data.map((e) => {
        if (e.title)
          return <TaskDetail data={e} saveHandler={saveHandler} key={e.id} />;
      })}
    </>
  );
};

export default Item;

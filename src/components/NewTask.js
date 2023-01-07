import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isAddTask, newTitleState } from "../recoil/atoms";
import { CiSaveDown1, CiCircleRemove } from "react-icons/ci";

const Task = styled.div`
  display: ${({ isAdd }) => (isAdd ? "block" : "none")}};
  border-bottom: 1px solid #ddd;
  padding: 1em;
  input {
    outline: 1px solid #ddd;
    border-radius: 0.2em;
    padding: 0.3em;
  }
  .mgR5 {
    margin-right: 0.5em;
  }
`;

const InsertTitle = styled.div`
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.8);
    width: calc(100% - 60px);
  }
`;

const InsertTime = styled.div``;

const NewTask = ({ saveHandler }) => {
  const [isAdd, setIsAdd] = useRecoilState(isAddTask);
  const [newTitle, setNewTitle] = useRecoilState(newTitleState);
  const newTaskRef = useRef();

  useEffect(() => {
    newTaskRef.current.focus();
  }, [isAdd]);

  const changeHandler = (e) => {
    setNewTitle(e.target.value);
  };
  const clickHandler = () => {
    setNewTitle("");
    saveHandler({ title: newTitle }, "add").then(setIsAdd(!isAdd));
  };

  const cancelHandler = () => {
    setNewTitle("");
    setIsAdd(false);
  };

  return (
    <Task isAdd={isAdd}>
      <InsertTitle>
        <input
          type="text"
          value={newTitle}
          ref={newTaskRef}
          placeholder="Insert your task"
          required
          onChange={changeHandler}
        />
        <div>
          <CiSaveDown1 onClick={clickHandler} className="mgR5" />
          <CiCircleRemove onClick={cancelHandler} />
        </div>
      </InsertTitle>
      <InsertTime></InsertTime>
    </Task>
  );
};

export default NewTask;

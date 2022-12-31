import { useState, useEffect } from "react";
import styled from "styled-components";

const UL = styled.ul`
  border-bottom: 1px solid #ddd;
  padding: 1em;
  display: flex;
  align-items: flex-start;
`;

const List = styled.li`
  margin-bottom: 0.3em;
  input {
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const Time = styled.p`
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);
`;

const TaskDetail = ({ data, saveHandler }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(data.title);
  }, [data]);

  const changeHandler = (e) => {
    setTitle(e.target.value);
  };

  const updateHandler = () => {
    saveHandler({ id: data.id, title: title }, "update");
  };

  const deleteHandler = () => {
    saveHandler({ id: data.id }, "delete");
  };

  return (
    <UL>
      <List>
        <input type="text" value={title} onChange={changeHandler} />
        {data.start.split("T")[1] && (
          <Time>
            {data.start.split("T")[1].substring(0, 5)}
            {data.end &&
              data.end.split("T")[1] &&
              " - " + data.end.split("T")[1].substring(0, 5)}
          </Time>
        )}
      </List>
      <li>
        <button onClick={updateHandler}>저장</button>
        <button onClick={deleteHandler}>삭제</button>
      </li>
    </UL>
  );
};

export default TaskDetail;

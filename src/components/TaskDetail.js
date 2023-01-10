import { useState, useEffect } from "react";
import styled from "styled-components";
// import { CiSaveDown1, CiCircleMinus } from "react-icons/ci";
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';

const UL = styled.ul`
  border-bottom: 1px solid #ddd;
  padding: 1em;

  .mgR5 {
    margin-right: 0.5em;
  }
`;

const List = styled.li`
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.8);
    padding: 0.3em;
    border-radius: 0.2em;
    width: calc(100% - 60px);
  }
  input:focus-visible {
    outline: 1px solid #ddd;
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
        <Space>
          <Button shape="circle" icon={<SaveOutlined />} onClick={updateHandler}/>
          <Button shape="circle" icon={<DeleteOutlined />} onClick={deleteHandler}/>
        </Space>

      </List>
      <li>
        {data.start.split("T")[1] && (
          <Time>
            {data.start.split("T")[1].substring(0, 5)}
            {data.end &&
              data.end.split("T")[1] &&
              " - " + data.end.split("T")[1].substring(0, 5)}
          </Time>
        )}
      </li>
    </UL>
  );
};

export default TaskDetail;

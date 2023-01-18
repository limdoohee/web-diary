import { useEffect } from "react";
import styled from "styled-components";
import TaskDetail from "../components/TaskDetail";
import { Header } from "../style/global";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isAddTask, newTitleState } from "../recoil/atoms";
import { filtered } from "../recoil/selector";
// import { CiCirclePlus } from "react-icons/ci";
import NewTask from "../components/NewTask";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Title = styled.h1`
  font-size: 1em;
  color: #808080;
  font-weight: 100;
`;

const Item = ({ saveHandler }) => {
  const [isAdd, setIsAdd] = useRecoilState(isAddTask);
  const setNewTitle = useSetRecoilState(newTitleState);
  const data = useRecoilValue(filtered);

  useEffect(() => {
    setIsAdd(false);
    setNewTitle("");
  }, [data, setIsAdd, setNewTitle]);

  const newTaskAddHandler = () => {
    setIsAdd(true);
  };

  return (
    <li>
      <Header>
        <Title>Task</Title>
        {!isAdd && (
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={newTaskAddHandler}
          />
        )}
      </Header>
      {isAdd && <NewTask saveHandler={saveHandler} />}
      {data.map((e) => {
        return (
          e.title && (
            <TaskDetail data={e} saveHandler={saveHandler} key={e.id} />
          )
        );
      })}
    </li>
  );
};

export default Item;

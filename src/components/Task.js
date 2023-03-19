import styled from "styled-components";
import TaskList from "./TaskList";
import { useRecoilValue } from "recoil";
import { filtered } from "../recoil/selector";
// import { CiCirclePlus } from "react-icons/ci";
import NewTask from "./NewTask";
import { useEffect } from "react";

const TaskContainer = styled.div`
  height: calc(100% - 5em);
  overflow-y: auto;
`;

const Item = (props) => {
  const data = useRecoilValue(filtered);
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <TaskContainer>
      {data.map((e) => {
        return (
          !e.diary && (
            <TaskList
              data={e}
              updateHandler={props.updateHandler}
              deleteHandler={props.deleteHandler}
              key={e.id}
            />
          )
        );
      })}
      <NewTask addHandler={props.addHandler} />
    </TaskContainer>
  );
};

export default Item;

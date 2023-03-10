import styled from "styled-components";
import TaskDetail from "../components/TaskDetail";
import { useRecoilValue } from "recoil";
import { filtered } from "../recoil/selector";
// import { CiCirclePlus } from "react-icons/ci";
import NewTask from "../components/NewTask";

const TaskContainer = styled.div`
  height: calc(100% - 5em);
  overflow-y: auto;
`;

const Item = ({ saveHandler }) => {
  const data = useRecoilValue(filtered);

  return (
    <TaskContainer>
      {data.map((e) => {
        return (
          !e.diary && (
            <TaskDetail data={e} saveHandler={saveHandler} key={e.id} />
          )
        );
      })}
      <NewTask saveHandler={saveHandler} />
    </TaskContainer>
  );
};

export default Item;

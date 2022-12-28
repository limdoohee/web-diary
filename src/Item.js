import styled from "styled-components";
import { db } from "./Firebase/Firebase";
import { doc, deleteDoc } from "firebase/firestore";

const UL = styled.ul`
  border-bottom: 1px solid #ddd;
  padding: 1em;
`;

const Title = styled.li`
  margin-bottom: 0.3em;
  input {
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const Time = styled.li`
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);
`;

const Item = ({ data, deleteData }) => {
  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      const docRef = await deleteDoc(doc(db, "date", data.id));
      deleteData({ id: data.id });
      //   console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <UL key={data.id}>
        <Title key={data.title}>
          <input type="text" value={data.title} readOnly />
        </Title>
        {data.start.split("T")[1] && (
          <Time>
            {data.start.split("T")[1].substring(0, 5)}
            {data.end &&
              data.end.split("T")[1] &&
              " - " + data.end.split("T")[1].substring(0, 5)}
          </Time>
        )}
        <button onClick={deleteHandler}>삭제</button>
      </UL>
    </>
  );
};

export default Item;

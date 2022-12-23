import styled from "styled-components";

const UL = styled.ul`
  border-bottom: 1px solid #ddd;
  padding: 1em;
`;

const Title = styled.li`
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 0.3em;
`;

const Time = styled.li`
  font-size: 0.9em;
  color: rgba(0, 0, 0, 0.6);
`;

const List = ({ data }) => {
  return (
    <>
      {data.map((e) => {
        return (
          <UL>
            <Title key={e.title}>{e.title}</Title>
            <Time>{e.start}</Time>
          </UL>
        );
      })}
    </>
  );
};

export default List;

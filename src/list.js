import styled from "styled-components";

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

const List = ({ data }) => {
  return (
    <>
      {data.map((e, i) => {
        return (
          <UL key={i}>
            <Title key={e.title}>
              <input type="text" value={e.title} />
            </Title>
            {e.start.split("T")[1] && (
              <Time>
                {e.start.split("T")[1].substring(0, 5)}
                {e.end &&
                  e.end.split("T")[1] &&
                  " - " + e.end.split("T")[1].substring(0, 5)}
              </Time>
            )}
          </UL>
        );
      })}
    </>
  );
};

export default List;

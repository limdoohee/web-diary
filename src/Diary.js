import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.75em;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 300;
`;

const Editor = styled.textarea`
  border:  ${({ isEditDiary }) => (isEditDiary ? "1px solid #ddd" : "none")}};
  resize: none;
`;

const Diary = ({ data, isEditDiary }) => {
  return (
    <>
      {data.map((e) => {
        return (
          <div key={e.id}>
            <Title>Diary</Title>
            <Editor value={e.diary} readOnly isEditDiary={isEditDiary} />
          </div>
        );
      })}
    </>
  );
};

export default Diary;

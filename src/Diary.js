import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.75em;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 300;
`;

const Editor = styled.textarea.attrs((isEditDiary) => ({
  readOnly: isEditDiary ? false : true,
}))`
  border:  ${({ isEditDiary }) => (isEditDiary ? "1px solid #ddd" : "none")}};
  resize: none;
`;

const Diary = ({ diary, isEditDiary, onChange }) => {
  return (
    <>
      {/* {data.map((e) => {
        return ( */}
      {/* <div key={e.id}> */}
      <Title>Diary</Title>
      <Editor value={diary} isEditDiary={isEditDiary} onChange={onChange} />
      {/* </div> */}
      {/* );
      })} */}
    </>
  );
};

export default Diary;

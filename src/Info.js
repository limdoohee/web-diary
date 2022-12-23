import List from "./List";
import styled from "styled-components";

const Wrapper = styled.div`
  border-left: 1px solid #ddd;
  width: 30%;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  > div {
    &:nth-child(1) {
      padding-top: 0.2em;
      padding-bottom: 1.66em;
      border-bottom: 1px solid #ddd;
    }
  }
`;

const Date = styled.h1`
  text-align: center;
  font-size: 1.75em;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 300;
`;

const Info = ({ clickeDate, data }) => {
  return (
    <Wrapper>
      <div>
        <Date>{clickeDate}</Date>
      </div>
      <div>
        <List data={data} />
        <div>일기부분</div>
      </div>
    </Wrapper>
  );
};

export default Info;

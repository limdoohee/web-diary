import styled from "styled-components";
import UserInfo from "../components/Header";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 87vh;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.7em;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.03);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  background: #fff;
  border-radius: 0.7em;
`;

const Loading = () => {
  return (
    <Wrapper>
      <UserInfo />
      <Container></Container>
    </Wrapper>
  );
};

export default Loading;

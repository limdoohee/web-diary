import styled from "styled-components";
import UserInfo from "../components/Header";
import { Skeleton, Divider, Space } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

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

const Calendar = styled.div`
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Detail = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  font-size: 1em;
  border-left: 1px solid #eee;
  padding: 0 2.5%;
  > div {
    &:nth-child(1) {
      padding: 1.9em 0 1.2em;
    }
  }
`;

const detailSkeleton = Array.from({ length: 3 }).map(() => (
  <>
    <Divider />
    <Space
      style={{
        marginBottom: "1em",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Skeleton.Input block active />
      <Skeleton.Avatar active />
    </Space>
    <Space>
      <Skeleton.Button active />
      <Skeleton.Input active />
    </Space>
  </>
));

const Loading = () => {
  return (
    <Wrapper>
      <UserInfo />
      <Container>
        <Calendar>
          <Skeleton.Node active>
            <CalendarOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
          </Skeleton.Node>
        </Calendar>
        <Detail>
          <Skeleton.Input active />
          {detailSkeleton}
        </Detail>
      </Container>
    </Wrapper>
  );
};

export default Loading;

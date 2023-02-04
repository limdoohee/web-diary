import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { useRecoilState } from "recoil";
import { userUID } from "../recoil/atoms";

const Header = styled.header`
  border-bottom: 1px solid #f0f1f4;
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

const NotLoggedIn = styled.div`
  flex: 1 0 auto;
  text-align: left;
  font-size: 0.9em;
  color: #ccc;
  font-weight: 300;
`;

const LoginButton = styled.button`
  cursor: ${(props) => props.userName === null && "pointer"};
  text-align: right;
  font-size: 0.9em;
`;

const auth = getAuth();
const provider = new GoogleAuthProvider();

const UserInfo = () => {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useRecoilState(userUID);

  useEffect(() => {
    loginHandler();
  }, []);

  const loginHandler = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result !== null) {
        setUserID(result.user.uid);
        setUserName(result.user.displayName);
      }
    } catch (error) {
      throw error;
    }
  };

  const login = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <Header>
      <NotLoggedIn>
        {userName === null
          ? "아래는 테스트 데이터입니다. 로그인해서 프라이빗한 기록도 즐겨보세요"
          : ""}
      </NotLoggedIn>
      <LoginButton
        userName={userName}
        onClick={userName === null ? login : undefined}
      >
        {userName === null
          ? "로그인해주세요"
          : `${userName}님, 오늘을 기록할까요?`}
      </LoginButton>
    </Header>
  );
};

export default UserInfo;

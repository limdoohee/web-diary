import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";

const Header = styled.header`
  border-bottom: 1px solid #f0f1f4;
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 1em;
`;

const auth = getAuth();
const provider = new GoogleAuthProvider();

const UserInfo = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    loginHandler();
  }, []);

  async function loginHandler() {
    try {
      const result = await getRedirectResult(auth);
      result !== null && setUserName(result.user.displayName);
    } catch (error) {
      throw error;
    }
  }

  function login() {
    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <Header>
      <button onClick={userName === null ? login : undefined}>
        {userName === null
          ? "로그인해주세요"
          : `${userName}님, 오늘을 기록할까요?`}
      </button>
    </Header>
  );
};

export default UserInfo;

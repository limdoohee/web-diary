import React from "react";
import ReactDOM from "react-dom/client";
import "./style/common.css";
import App from "./containers/App";
import { GlobalStyle } from "./style/global";
import { RecoilRoot } from "recoil";
import Loading from "./containers/Loading";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <React.Suspense fallback={<Loading />}>
        <App />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>
);

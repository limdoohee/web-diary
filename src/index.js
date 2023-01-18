import React from "react";
import ReactDOM from "react-dom/client";
import "./style/common.css";
import App from "./containers/App";
import { GlobalStyle } from "./style/global";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
        <GlobalStyle />
      </React.Suspense>
    </RecoilRoot>
  </React.StrictMode>
);

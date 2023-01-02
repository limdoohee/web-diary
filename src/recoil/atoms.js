import { atom } from "recoil";

export const clickDateState = atom({
  key: "clickDateState",
  default: new Date().toISOString().split("T")[0],
});

export const diaryDataState = atom({
  key: "diaryDataState",
  default: "",
});

export const diaryContentsState = atom({
  key: "diaryContents",
  default: "",
});

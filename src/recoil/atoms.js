import { atom } from "recoil";

export const clickDateState = atom({
  key: "clickDateState",
  default: new Date().toISOString().split("T")[0],
});

export const isAddTask = atom({
  key: "isAddTask",
  default: false,
});

export const newTitleState = atom({
  key: "newTitleState",
  default: "",
});

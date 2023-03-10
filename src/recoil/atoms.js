import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
  key: "userState",
  default: null,
  storage: localStorage,
  effects_UNSTABLE: [persistAtom],
});

export const clickDateState = atom({
  key: "clickDateState",
  default: new Date().toISOString().split("T")[0],
});

export const newTitleState = atom({
  key: "newTitleState",
  default: "",
});

export const userUID = atom({
  key: "userUID",
  default: "temp",
  storage: localStorage,
  effects_UNSTABLE: [persistAtom],
});

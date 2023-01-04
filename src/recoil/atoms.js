import { atom, selector } from "recoil";
import { initailData } from "./selector";

export const clickDateState = atom({
  key: "clickDateState",
  default: new Date().toISOString().split("T")[0],
});

/**
 * firebase에 추가,변경,삭제 후 페이지 전체가 깜빡이지 않고
 * 캘린더의 내용과 목록데이터만 변경될 수 있도록 별도 state를 둔다.
 */
export const loadData = atom({
  key: "loadData",
  default: selector({
    key: "initailData",
    get: () => initailData(),
  }),
});

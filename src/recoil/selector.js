import { selector, atom } from "recoil";
import { db } from "../Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { clickDateState } from "./atoms";

export const initailData = selector({
  key: "initailData",
  get: async ({ get }) => {
    return await getDocs(collection(db, "date")).then((querySnapshot) => {
      const newData = querySnapshot.docs
        .map((doc) => {
          if (!doc.data().title) {
            return {
              ...doc.data(),
              id: doc.id,
              color: "#FBC252",
              className: "fc-diary",
            };
          } else {
            return {
              ...doc.data(),
              id: doc.id,
              color: "#A3BB98",
            };
          }
        })
        .map((arr) => {
          return arr.end
            ? { ...arr, dateList: getDateList(arr.start, arr.end) }
            : { ...arr };
        });
      return newData;
    });
  },
});

export const filtered = selector({
  key: "filtered",
  get: ({ get }) => {
    const data = get(loadData);
    const clickDate = get(clickDateState);
    return [
      ...data.filter((el) => el.start.split("T")[0] === clickDate),
      ...data
        .filter((list) => list.dateList)
        .filter((list) => {
          const includeClickDate = list.dateList.filter((e) => e === clickDate);
          return includeClickDate.length > 0 && list;
        }),
    ];
  },
});

export const diaryDataState = selector({
  key: "diaryDataState",
  get: ({ get }) => {
    const filteredData = get(filtered);
    return filteredData.length > 0
      ? filteredData.filter((e) => e.diary)[0]
      : "";
  },
  set: ({ set }, newValue) => console.log(newValue),
});

/**
 *
 * @param {*} startDate
 * @param {*} EndDate
 * @description startDate와 EndDate 사이의 날짜 가져오기
 */
const getDateList = (startDate, EndDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(EndDate);
  const diff = date2.getTime() - date1.getTime();
  const diffDay = diff / 1000 / 60 / 60 / 24;

  if (diffDay > 1) {
    let arr = [];
    date1.setDate(date1.getDate() + 1);
    while (date1 < date2) {
      arr.push(new Date(date1).toISOString().split("T")[0]);
      date1.setDate(date1.getDate() + 1);
    }
    return arr;
  }
};

/**
 * firebase에 추가,변경,삭제 후 페이지 전체가 깜빡이지 않고
 * 캘린더의 내용과 목록데이터만 변경될 수 있도록 별도 state를 둔다.
 */
export const loadData = atom({
  key: "loadData",
  default: selector({
    key: "initailData/default",
    get: () => initailData,
  }),
});

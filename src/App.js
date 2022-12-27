import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Detail from "./Detail";
import { db } from "./Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [loadData, setLoadData] = useState([]);
  const [clickDate, setClickDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    return await getDocs(collection(db, "date")).then((querySnapshot) => {
      const newData = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .map((arr) => {
          return arr.end
            ? { ...arr, dateList: getDateList(arr.start, arr.end) }
            : { ...arr };
        });
      return newData;
    });
  };

  useEffect(() => {
    getData().then((res) => {
      setLoadData(res);
    });
  }, []);

  useEffect(() => {
    setFilteredData([
      ...loadData.filter((el) => el.start.split("T")[0] === clickDate),
      ...loadData
        .filter((list) => list.dateList)
        .filter((list) => {
          var test = list.dateList.filter((e) => e === clickDate);
          if (test.length > 0) return list;
        }),
    ]);
  }, [loadData, clickDate]);

  const handleDateClick = (arg) => {
    setClickDate(arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    setClickDate(clickInfo.event.startStr.split("T")[0]);
  };

  const moreClick = (info) => {
    setClickDate(info.date.toISOString().split("T")[0]);
    return "month";
  };

  const changeData = (addData) => {
    setLoadData([...loadData, addData]);
  };

  return (
    <div className="container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        events={loadData}
        headerToolbar={{
          left: "prev today",
          center: "title",
          right: "next",
        }}
        dateClick={handleDateClick}
        dayMaxEvents={true}
        moreLinkClick={moreClick}
        // editable={true}
        // selectMirror={true}
        eventClick={handleEventClick}
        // eventContent={renderEventContent}
      />
      <Detail
        clickeDate={clickDate}
        data={filteredData}
        changeData={changeData}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

/**
 *
 * @param {*} startDate
 * @param {*} EndDate
 * @description startDate와 EndDate 사이의 날짜 가져오기
 */
function getDateList(startDate, EndDate) {
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
}

export default App;

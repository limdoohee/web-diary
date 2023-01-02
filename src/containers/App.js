import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Detail from "./Detail";
import { clickDateState } from "../recoil/atoms";
import { initailData } from "../recoil/selector";
import { useRecoilValue, useRecoilState } from "recoil";

function App() {
  const [loadData, setLoadData] = useState([]);
  const [clickDate, setClickDate] = useRecoilState(clickDateState);
  const [filteredData, setFilteredData] = useState([]);
  const data = useRecoilValue(initailData);

  useEffect(() => {
    setLoadData(data);
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

  const changeData = (data, type) => {
    switch (type) {
      case "add":
        setLoadData([...loadData, data]);
        break;
      case "update":
        setLoadData(
          [...loadData].map((e) => {
            if (e.id === data.id) {
              if (data.title) e.title = data.title;
              if (data.diary) e.diary = data.diary;
            }
            return e;
          })
        );
        break;
      case "delete":
        setLoadData(loadData.filter((e) => e.id !== data.id));
        break;
      default:
        break;
    }
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
          left: "prev",
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
        // clickeDate={clickDate}
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

export default App;

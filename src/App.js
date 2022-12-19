import React, { useCallback, useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import List from "./list";
import { db } from "./Firebase/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    await getDocs(collection(db, "date")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        title: doc.id,
      }));
      setData(newData);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const [clickDate, setClickDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

  const handleDateClick = (arg) => {
    setClickDate(arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    setClickDate(clickInfo.event.startStr.substring(0, 10));
  };

  const moreClick = (info) => {
    console.log(info.date.toISOString());
    return "month";
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
        events={data}
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
      <List date={clickDate} />
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

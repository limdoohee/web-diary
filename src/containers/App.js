import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Detail from "./Detail";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clickDateState } from "../recoil/atoms";
import { loadData } from "../recoil/selector";
import "../style/override.css";

function App() {
  const setClickDate = useSetRecoilState(clickDateState);
  const data = useRecoilValue(loadData);
  const hasClass = document.querySelector(".selected");

  const handleDateClick = (arg) => {
    hasClass && hasClass.classList.remove("selected");
    arg.dayEl.className += " selected";
    setClickDate(arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    setClickDate(clickInfo.event.startStr.split("T")[0]);
  };

  const moreClick = (info) => {
    setClickDate(info.date.toISOString().split("T")[0]);
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
      <Detail />
    </div>
  );
}

// a custom render function
// function renderEventContent(eventInfo) {
//   console.log(eventInfo);
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

export default App;

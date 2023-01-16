import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Detail from "./Detail";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clickDateState } from "../recoil/atoms";
import { loadData } from "../recoil/selector";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 87vh;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

  .fc {
    width: 65%;
    height: 100%;
    padding: 0 4%;
    margin: 0 auto;
  }

  .fc .fc-toolbar-title {
    font-size: 1.5em;
    font-weight: 300;
    color: #808080;
  }
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 2em 0;
  }
  .fc .fc-daygrid-day-frame:hover {
    cursor: pointer;
  }

  .fc .fc-daygrid-day-number {
    padding: 4px 0.4em 2px;
  }

  .fc .fc-daygrid-day-frame:hover .fc-daygrid-day-number,
  .fc-daygrid-day.selected .fc-daygrid-day-number {
    background: rgb(134, 177, 205, 0.5);
    border-radius: 0.2em;
  }

  .fc-h-event .fc-event-title-container {
    cursor: pointer;
  }

  .fc-daygrid-dot-event .fc-event-title {
    font-weight: normal !important;
  }

  .fc .fc-button {
    padding: 0.4em;
  }

  .fc-theme-standard td,
  .fc-theme-standard th,
  .fc-theme-standard .fc-scrollgrid {
    border: none;
  }

  .fc .fc-button:focus,
  .fc .fc-button-primary:not(:disabled).fc-button-active:focus,
  .fc .fc-button-primary:not(:disabled):active:focus {
    box-shadow: none;
  }

  .fc .fc-button-primary:hover,
  .fc .fc-button-primary:not(:disabled).fc-button-active:focus,
  .fc .fc-button-primary:not(:disabled):active:focus {
    padding: 0.4em;
    background-color: #f0f0f0;
    border-radius: 1.5em;
  }

  .fc
    .fc-button-primary:not(:disabled):active:focus
    .fc-icon-chevron-right:before,
  .fc
    .fc-button-primary:not(:disabled):active:focus
    .fc-icon-chevron-left:before {
    color: #999999;
  }

  .fc-icon-chevron-right:before,
  .fc-icon-chevron-left:before {
    transition: 0.1s all ease-out;
  }

  .fc .fc-col-header-cell-cushion {
    font-weight: 300;
    color: #808080;
  }

  .fc .fc-daygrid-day-top {
    justify-content: center;
  }

  .fc .fc-day-other {
    opacity: 0.3;
  }

  .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0.2em;
  }

  .fc-daygrid-dot-event.fc-event-mirror,
  .fc-daygrid-dot-event:hover,
  .fc .fc-highlight,
  .fc .fc-daygrid-day.fc-day-today,
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active {
    background: none !important;
  }
`;

function App() {
  const setClickDate = useSetRecoilState(clickDateState);
  const data = useRecoilValue(loadData);
  let hasClass = "";

  const handleDateClick = (arg) => {
    hasClass = document.querySelector(".selected");
    hasClass && hasClass.classList.remove("selected");
    arg.dayEl.className += " selected";
    setClickDate(arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    hasClass = document.querySelector(".selected");
    hasClass && hasClass.classList.remove("selected");
    clickInfo.jsEvent.path[7].classList += " selected";
    setClickDate(clickInfo.event.startStr.split("T")[0]);
  };

  const moreClick = (info) => {
    hasClass = document.querySelector(".selected");
    hasClass && hasClass.classList.remove("selected");
    info.jsEvent.path[4].classList += " selected";
    setClickDate(info.date.toISOString().split("T")[0]);
    return "month";
  };

  return (
    <Container>
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
    </Container>
  );
}

export default App;

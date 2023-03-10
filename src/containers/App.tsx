import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Detail from "./Detail";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clickDateState } from "../recoil/atoms";
import { loadData } from "../recoil/selector";
import styled from "styled-components";
import UserInfo from "../components/Header";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 87vh;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.7em;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.03);
`;

const Container = styled.div`
  height: calc(100% - 4em);
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  background: #fff;
  border-radius: 0.7em;

  .fc {
    width: 65%;
    height: 100%;
    padding: 0 4%;
    margin: 0 auto;
  }

  .fc .fc-toolbar-title {
    font-size: 1.5em;
    font-weight: 100;
    color: #808080;
  }
  .fc .fc-toolbar.fc-header-toolbar {
    margin: 1.5em 0 1em;
  }
  // .fc .fc-daygrid-day-frame:hover {
  //   cursor: pointer;
  // }

  .fc .fc-daygrid-day-number {
    padding: 2px 0;
    width: 1.7em;
    text-align: center;
  }

  .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
    background: rgba(0, 0, 0, 0.07);
    border-radius: 0.5em;
  }

  .fc .fc-daygrid-day-frame .fc-daygrid-day-number:hover,
  .fc .fc-daygrid-day.selected .fc-daygrid-day-number {
    cursor: pointer;
    background: rgb(134, 177, 205, 0.5);
    border-radius: 0.5em;
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
    font-weight: 100;
    color: #808080;
  }

  .fc .fc-daygrid-day-top {
    justify-content: center;
  }

  .fc .fc-day-other {
    opacity: 0.3;
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
  let hasClass = null;

  const handleDateClick = (arg: any) => {
    hasClass = document.querySelector(".selected");
    hasClass && hasClass?.classList.remove("selected");
    arg.dayEl.className += " selected";
    setClickDate(arg.dateStr);
  };

  function handleEventClick(clickInfo: any) {
    hasClass = document.querySelector(".selected");
    hasClass && hasClass?.classList.remove("selected");
    document
      .querySelector(`[data-date="${clickInfo.event.startStr.split("T")[0]}"]`)
      ?.classList.add("selected");
    setClickDate(clickInfo.event.startStr.split("T")[0]);
  }

  const moreClick = (info: any) => {
    hasClass = document.querySelector(".selected");
    hasClass && hasClass.classList.remove("selected");
    document
      .querySelector(`[data-date="${info.date.toISOString().split("T")[0]}"]`)
      ?.classList.add("selected");
    setClickDate(info.date.toISOString().split("T")[0]);
    return "month";
  };

  return (
    <Wrapper>
      <UserInfo />
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
          eventClick={handleEventClick}
        />
        <Detail />
      </Container>
    </Wrapper>
  );
}

export default App;

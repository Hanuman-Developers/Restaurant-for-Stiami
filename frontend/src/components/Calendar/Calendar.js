import React from "react";
import "./Calendar.css";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import VerticalNav from "../VerticalNav/VerticalNav";
import Sidebar from "../VerticalNav/Sidebar";
function Calendar() {
  return (
    <>
      <div className="main__container">
        {/* <VerticalNavbar /> */}
        <VerticalNav />

        <div className="calendar__container">
          Hello
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
              { title: "event 1", date: "2022-09-04" },
              { title: "event 2", date: "2019-04-02" },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;

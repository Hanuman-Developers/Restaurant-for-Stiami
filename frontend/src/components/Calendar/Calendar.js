import React from "react";
import "./Calendar.css";
import VerticalNavbar from "../VerticalNavbar/VerticalNavbar";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import VerticalNav from "../VerticalNav/VerticalNav";
import Sidebar from "../VerticalNav/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
function Calendar() {
  const events = [
    {
      title: "Vacation",
      start: new Date(2023, 12, 9),
      end: new Date(2023, 12, 9),
    },
    {},
  ];
  return (
    <>
      <VerticalNav />
      <AdminNavbar heading="Calendar" />
      <>
        <div className="full_bg">
          {/* <h1>Huck</h1> */}
          <div className="board">
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
    </>
  );
}

export default Calendar;

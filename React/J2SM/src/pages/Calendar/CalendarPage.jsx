// src/pages/CalendarPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/dashboardMain.scss";
import "../../styles/DashBoard/board.scss";
import "flatpickr/dist/themes/dark.css";
import MyCalendar from "../../components/calendar/MyCalendar";

const MyCalendarPage = () => {
  return (
    <div className="dashboardMainContent" id="calendar">
      <DashboardLayout>
        <Aside />

        <div className="contentArea">
          <MyCalendar />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MyCalendarPage;

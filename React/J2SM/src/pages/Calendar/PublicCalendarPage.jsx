// src/pages/CalendarPage.jsx
import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/dashboardMain.scss";
import "../../styles/DashBoard/board.scss";
import "flatpickr/dist/themes/dark.css";

const PublicCalendarPage = () => {
  return (
    <div className="dashboardMainContent" id="public-calendar">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <PublicCalendar />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default PublicCalendarPage;

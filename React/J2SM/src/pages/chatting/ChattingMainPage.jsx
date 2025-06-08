// src/pages/CalendarPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/dashboardMain.scss";
import "flatpickr/dist/themes/dark.css";
import ChattingMain from "../../components/chatting/ChattingMain";
import "../../styles/Chatting/chatting.scss";
import "../../styles/Chatting/ChatRoomCreateModal.scss";

const ChattingMainPage = () => {
  return (
    <div className="dashboardMainContent" id="chatting">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <ChattingMain />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ChattingMainPage;

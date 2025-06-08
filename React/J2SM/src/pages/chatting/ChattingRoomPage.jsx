import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/dashboardMain.scss";
import "flatpickr/dist/themes/dark.css";
import "../../styles/Chatting/chatting.scss";
import ChattingRoom from "../../components/chatting/ChattingRoom";

const ChattingRoomPage = () => {
  return (
    <div className="dashboardMainContent" id="chattingroom">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <ChattingRoom />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ChattingRoomPage;

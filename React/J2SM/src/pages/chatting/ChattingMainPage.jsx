// src/pages/CalendarPage.jsx

import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/dashboardMain.scss";
import "flatpickr/dist/themes/dark.css";
import ChattingMain from "../../components/chatting/ChattingMain";
import "../../styles/Chatting/chatting.scss";
import "../../styles/Chatting/ChatRoomCreateModal.scss";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ChattingMainPage = () => {
  // username = uid
  const { username } = useAuth();
  const currentUserId = username;
  const navigate = useNavigate();

  // 리스트에서 방 클릭 시 호출될 함수
  const handleSelectRoom = (roomId) => {
    navigate(`/dashboard/chatting/room/${roomId}`);
  };

  return (
    <div className="dashboardMainContent" id="chatting">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <ChattingMain
            currentUserId={currentUserId}
            onSelectRoom={handleSelectRoom}
          />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ChattingMainPage;

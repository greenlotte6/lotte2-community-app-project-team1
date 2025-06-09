import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/dashboardMain.scss";
import "flatpickr/dist/themes/dark.css";
import "../../styles/Chatting/chatting.scss";
import ChattingRoom from "../../components/chatting/ChattingRoom";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ChattingRoomPage = () => {
  const { roomId } = useParams();
  const { username, nick } = useAuth();
  const userId = username;

  return (
    <div className="dashboardMainContent" id="chattingroom">
      <DashboardLayout>
        <Aside />
        <div className="contentArea" id="chat">
          <ChattingRoom roomId={roomId} userId={userId} nick={nick} />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ChattingRoomPage;

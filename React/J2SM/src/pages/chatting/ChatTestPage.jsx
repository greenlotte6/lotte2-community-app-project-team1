import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import ChatRoom from "../../components/chatting/ChatRoom";
import Aside from "../../components/DashBoard/Aside";

const ChatTestPage = () => {
  return (
    <div className="dashboardMainContent" id="chatting">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <ChatRoom roomId="123" userId="user1" />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ChatTestPage;

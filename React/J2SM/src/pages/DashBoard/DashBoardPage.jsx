import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import TopArea from "../../components/DashBoard/TopArea";
import MidArea from "../../components/DashBoard/MidArea";
import BottomArea from "../../components/DashBoard/BottomArea";
import "../../styles/DashBoard/dashboardMain.scss";
import Aside from "../../components/DashBoard/Aside";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="dashboardMainContent">
        <Aside />
        <div className="contentArea">
          <TopArea />
          <MidArea />
          <BottomArea />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;

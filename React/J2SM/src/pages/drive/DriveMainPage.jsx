import React from "react";
import DriveMain from "../../components/drive/DriveMain";
import Aside from "../../components/DashBoard/Aside";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/drive/drive.scss";

const DriveMainPage = () => {
  return (
    <div id="drive">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <DriveMain />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DriveMainPage;

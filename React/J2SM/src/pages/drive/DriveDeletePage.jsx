import React from "react";
import DriveDelete from "../../components/drive/DriveDelete";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";

const DriveDeletePage = () => {
  return (
    <div id="drive">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <DriveDelete />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DriveDeletePage;

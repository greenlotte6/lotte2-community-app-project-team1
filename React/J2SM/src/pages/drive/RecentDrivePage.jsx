import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import RecentDrive from "../../components/drive/RecentDrive";

const RecentDrivePage = () => {
  return (
    <div id="drive">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <RecentDrive />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default RecentDrivePage;

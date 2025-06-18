import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import ShareDrive from "../../components/drive/ShareDrive";

const ShareDrivePage = () => {
  return (
    <div id="drive">
      <DashboardLayout>
        <Aside />
        <div className="contentArea">
          <ShareDrive />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ShareDrivePage;

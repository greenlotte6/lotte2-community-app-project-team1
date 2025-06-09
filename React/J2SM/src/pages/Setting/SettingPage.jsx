import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/Setting.scss";
import { SettingAside } from "../../components/Setting/SettingAside";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";
import { SettingMid } from "../../components/Setting/SettingMid";

const SettingPage = () => {
  return (
    <div id="SettingPage">
      <DashboardLayout>
        <SettingAside />
        <div className="contentArea">
          <AdminCommonTop title={"Setting"} />
          <SettingMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SettingPage;

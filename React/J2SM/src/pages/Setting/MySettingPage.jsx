import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/Setting.scss";
import { SettingAside } from "../../components/Setting/SettingAside";
import { AdminCommonTop } from "../../components/admin/AdminCommonTop";
import { SettingMy } from "../../components/Setting/SettingMy";

const MySettingPage = () => {
  return (
    <div id="SettingPage">
      <DashboardLayout>
        <SettingAside />
        <div className="contentArea">
          <AdminCommonTop title={"My Setting"} />
          <SettingMy />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MySettingPage;

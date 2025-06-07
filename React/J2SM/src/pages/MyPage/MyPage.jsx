import React from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import "../../styles/DashBoard/MyPage.scss";
import { MyAside } from "../../components/MyPage/MyAside";
import { MyTop } from "../../components/MyPage/MyTop";
import { MyMid } from "../../components/MyPage/MyMid";

const MyPage = () => {
  return (
    <div id="MyPage">
      <DashboardLayout>
        <MyAside />
        <div className="contentArea">
          <MyTop />
          <MyMid />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default MyPage;

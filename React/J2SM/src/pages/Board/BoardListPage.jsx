// src/pages/Board/BoardPage.jsx

import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/board.scss";

import BoardMain from "../../components/board/BoardMain";
import BoardList from "../../components/board/BoardList";

const BoardListPage = () => {
  return (
    <div className="dashboardMainContent" id="boardlist">
      <DashboardLayout>
        <Aside />

        <div className="contentArea">
          <BoardList />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default BoardListPage;

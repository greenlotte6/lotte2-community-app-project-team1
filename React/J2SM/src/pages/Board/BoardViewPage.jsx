// src/pages/Board/BoardPage.jsx

import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/board.scss";

import BoardList from "../../components/board/BoardList";
import BoardView from "../../components/board/BoardView";

const BoardViewPage = () => {
  return (
    <div className="dashboardMainContent" id="boardview">
      <DashboardLayout>
        <Aside />

        <div className="contentArea">
          <BoardView />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default BoardViewPage;

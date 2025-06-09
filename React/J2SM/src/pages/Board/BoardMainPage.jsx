// src/pages/Board/BoardPage.jsx

import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import Aside from "../../components/DashBoard/Aside";
import "../../styles/DashBoard/board.scss";

import BoardMain from "../../components/board/BoardMain";

const BoardMainPage = () => {
  return (
    <div className="dashboardMainContent" id="board">
      <DashboardLayout>
        <Aside />

        <div className="contentArea">
          <BoardMain />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default BoardMainPage;

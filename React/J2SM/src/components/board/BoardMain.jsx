import React from "react";
import BoardMainTable from "./main/BoardMainTable";
import BoardLeftTable from "./main/BoardLeftTable";
import BoardRightTable from "./main/BoardRightTable";

const BoardMain = () => {
  return (
    <>
      <div class="line"></div>
      <BoardMainTable />

      <div class="board-sub">
        <BoardLeftTable />
        <BoardRightTable />
      </div>
    </>
  );
};

export default BoardMain;

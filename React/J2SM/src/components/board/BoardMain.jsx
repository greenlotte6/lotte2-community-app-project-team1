import React from "react";
import BoardMainTable from "./main/BoardMainTable";
import BoardLeftTable from "./main/BoardLeftTable";
import BoardRightTable from "./main/BoardRightTable";

const BoardMain = () => {
  return (
    <>
      <div className="line"></div>
      <BoardMainTable />

      <div className="board-sub">
        <BoardLeftTable />
        <BoardRightTable />
      </div>
    </>
  );
};

export default BoardMain;

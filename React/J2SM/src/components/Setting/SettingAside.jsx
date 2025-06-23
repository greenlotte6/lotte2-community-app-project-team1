import React from "react";
import { Link } from "react-router-dom";

export const SettingAside = () => {
  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>Setting</h3>
        </div>
        <div className="childArea">
          <Link to={"/dashboard/setting"}>Home</Link>
          <br></br>
          <br></br>
          <Link to={"/dashboard/setting/my"}>나의 설정</Link>
        </div>
      </div>
    </aside>
  );
};

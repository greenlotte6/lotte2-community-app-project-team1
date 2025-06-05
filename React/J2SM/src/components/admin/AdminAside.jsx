import React from "react";
import { Link } from "react-router-dom";

export const AdminAside = () => {
  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>Admin</h3>
        </div>
        <div className="sidelink">
          <Link to="/view/Admin/adminMain.html">Main</Link>
          <br />
        </div>
        <div className="childArea">
          <div>
            <img src="/images/Home.svg" alt="users" />
            <Link to="/admin/main">Home</Link>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          <div>
            <img src="/images/Users.svg" alt="users" />
            <Link to="/admin/employee">Employee Management</Link>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          <div>
            <img src="/images/Users.svg" alt="users" />
            <Link to="/admin/membership">MemberShip</Link>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          <div>
            <img src="/images/Users.svg" alt="users" />
            <Link to="/admin/adminpayment">Payment details</Link>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
        </div>
      </div>
    </aside>
  );
};

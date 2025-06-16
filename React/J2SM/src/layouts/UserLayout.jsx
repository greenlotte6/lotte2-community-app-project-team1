import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div id="user_container">
      <div className="container">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default UserLayout;

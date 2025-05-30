import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div class="container">
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;

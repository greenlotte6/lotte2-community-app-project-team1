import React from "react";
import UserLayout from "../../layouts/UserLayout";
import "../../styles/layer/user.scss";
import Login from "../../components/user/Login";

const LoginPage = () => {
  return (
    <UserLayout>
      <Login></Login>
    </UserLayout>
  );
};

export default LoginPage;

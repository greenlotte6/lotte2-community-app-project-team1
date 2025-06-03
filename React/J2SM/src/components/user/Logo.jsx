import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate("/");
  };

  return <img src="/images/logo.png" alt="로고" onClick={homeHandler} />;
};

export default Logo;

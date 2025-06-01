import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  // 페이지 이동을 위한 navigate
  const navigate = useNavigate();

  const home = () => {
    navigate("/");
  };

  const loginHandler = () => {
    navigate("/user/login");
  };

  const inquireHandler = () => {
    navigate("/user/login");
  };

  return (
    <>
      <header>
        <div id="header_main">
          <div id="header_logo" onClick={home}>
            <div>
              <img src="/images/mini_logo.png" alt="J2" />
              <img src="/images/logo.png" alt="J2SM" />
            </div>
            <div>
              <span>The everything app, for work.</span>
            </div>
          </div>

          <nav>
            <a href="#">기능소개</a>
            <a href="#">이용요금</a>
            <a href="#">지원센터</a>
          </nav>

          <div id="header_right">
            <button
              id="contact_btn"
              className="border border-purple-600 text-purple-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-600 hover:text-white transition duration-200"
              onClick={loginHandler}
            >
              Contact Sales
            </button>

            <button
              id="header_login_btn"
              className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
              onClick={loginHandler}
            >
              로그인
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

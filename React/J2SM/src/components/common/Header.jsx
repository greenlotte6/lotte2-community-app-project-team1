import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import useAuth from "../../hooks/useAuth";
import { getUserLogout } from "../../api/userAPI";

export const Header = () => {
  // 페이지 이동을 위한 navigate
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  const home = () => {
    navigate("/");
  };

  const loginHandler = () => {
    navigate("/user/login");
  };

  const qnaHandler = () => {
    navigate("/qna");
  };

  // 로그아웃
  const logoutHandler = () => {
    // 로그아웃 서버 요청
    const fetchData = async () => {
      try {
        const data = await getUserLogout();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();

    // 로그아웃 처리
    logout();

    // 로그인 이동
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

          <nav className="flex gap-10 text-gray-700 font-semibold text-base">
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              offset={-80}
              className="hover:text-purple-600 hover:underline underline-offset-8 cursor-pointer transition"
            >
              기능소개
            </ScrollLink>
            <ScrollLink
              to="credits"
              smooth={true}
              duration={500}
              offset={-80}
              className="hover:text-purple-600 hover:underline underline-offset-8 cursor-pointer transition"
            >
              이용요금
            </ScrollLink>
            <ScrollLink
              to="showImage"
              smooth={true}
              duration={500}
              offset={-80}
              className="hover:text-purple-600 hover:underline underline-offset-8 cursor-pointer transition"
            >
              이미지소개
            </ScrollLink>
          </nav>

          <div id="header_right">
            <button
              id="contact_btn"
              className="border border-purple-600 text-purple-600 px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-600 hover:text-white transition duration-200"
              onClick={qnaHandler}
            >
              Contact Sales
            </button>

            {!username ? (
              <>
                <button
                  id="header_login_btn"
                  className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
                  onClick={loginHandler}
                >
                  로그인
                </button>
              </>
            ) : (
              <>
                <button
                  id="header_login_btn"
                  className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
                  onClick={logoutHandler}
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

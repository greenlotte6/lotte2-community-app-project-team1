import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserLogout } from "../../api/userAPI";
import useAuth from "../../hooks/useAuth";

export const Header = () => {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

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
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="로고" />
        </Link>
        <p>
          <Link to="/">HOME |</Link>

          {!username ? (
            <>
              <Link to="/user/login">로그인 |</Link>
              <Link to="/user/terms">회원가입 |</Link>
            </>
          ) : (
            <>
              <a href="./myinfo/cart.html">나의정보 |</a>
              <Link onClick={logoutHandler}>로그아웃 |</Link>
              <a href="./admin/">관리자 |</a>
            </>
          )}

          <a href="./community/qna.html">고객센터</a>
        </p>
        <img src="/images/head_txt_img.png" alt="3만원 이상 무료배송" />

        <ul className="gnb">
          <li>
            <Link to="/introduction/hello">팜스토리소개</Link>
          </li>
          <li>
            <Link to="/market/list">
              <img src="/images/head_menu_badge.png" alt="30%" />
              장보기
            </Link>
          </li>
          <li>
            <Link to="/board/list?cate1=croptalk&cate2=story">
              농작물이야기
            </Link>
          </li>
          <li>
            <Link to="/board/list?cate1=event&cate2=info">이벤트</Link>
          </li>
          <li>
            <Link to="/board/list?cate1=community&cate2=notice">커뮤니티</Link>
          </li>
        </ul>
      </header>
    </>
  );
};

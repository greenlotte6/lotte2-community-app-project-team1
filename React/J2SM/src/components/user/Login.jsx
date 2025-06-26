import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { postUserLogin } from "../../api/userAPI";
import Logo from "./Logo";
import { SOCIAL_GOOGLE, SOCIAL_KAKAO, SOCIAL_NAVER } from "../../api/_http";

const initState = {
  uid: "",
  pass: "",
};
const Login = () => {
  const [user, setUser] = useState({ ...initState });
  const navigate = useNavigate();

  const { login } = useAuth();

  // 핸들러
  const changeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 네이버 로그인
  const naverHandler = (e) => {
    e.preventDefault();
    window.location.href = "https://api.j2sm.site/oauth2/authorization/naver";
  };

  // 구글
  const googleHandler = (e) => {
    e.preventDefault();
    window.location.href = "https://api.j2sm.site/oauth2/authorization/google";
  };

  // 카카오
  const kakaoHandler = (e) => {
    e.preventDefault();
    window.location.href = "https://api.j2sm.site/oauth2/authorization/kakao";
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // 서버 요청 정의
    const fetchData = async () => {
      try {
        // 로그인
        const data = await postUserLogin(user);
        console.log(data);

        if (data.username) {
          // context login 호출
          login(
            data.username,
            decodeURIComponent(data.department),
            decodeURIComponent(data.company),
            data.nick,
            data.membership
          );

          // 메인 이동(컴포넌트 라우팅)
          navigate("/dashboard/main");
        }
      } catch (err) {
        console.error(err);
      }
    };

    // 호출
    fetchData();
  };

  return (
    <div id="user_page">
      <img src="/images/user/login3.jpg" alt="로그인 화면" />
      <div id="login_form">
        <Logo />
        <div>
          <p className="txt_bold">안녕하세요, J2SM에 오신 것을 환영합니다.</p>
          <form onSubmit={submitHandler} id="login">
            <p>아이디</p>
            <input
              type="text"
              name="uid"
              placeholder="아이디를 입력해주세요."
              onChange={changeHandler}
              required
            />

            <p>비밀번호</p>

            <div className="input_wrap">
              <input
                type="password"
                name="pass"
                id="password"
                placeholder="비밀번호를 입력하세요"
                onChange={changeHandler}
                required
              />
            </div>

            <div className="select_box">
              <label className="switch">
                <input type="checkbox" name="remember" />
                <span className="slider round"></span>
                자동 로그인
                <div className="find_tag">
                  <Link to="/user/findid">아이디 찾기ㅣ</Link>
                  <Link to="/user/findpass">비밀번호 찾기</Link>
                </div>
              </label>

              <button type="submit" className="login_btn">
                로그인
              </button>
            </div>
          </form>

          <div id="social_login">
            <img
              src="/images/user/kakao_small.png"
              alt="카카오 로그인"
              onClick={kakaoHandler}
            />

            <img
              src="/images/user/naver_small.png"
              alt="네이버 로그인"
              onClick={naverHandler}
            />

            <img
              src="/images/user/google_small.png"
              alt="구글 로그인"
              onClick={googleHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

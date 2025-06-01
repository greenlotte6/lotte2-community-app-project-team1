import React from "react";

const Login = () => {
  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <img src="/images/logo.png" alt="로고" />
        <div>
          <p className="txt_bold">안녕하세요, J2SM에 오신 것을 환영합니다.</p>
          <form action="#" id="login">
            <p>아이디</p>
            <input
              type="text"
              name="uid"
              placeholder="아이디를 입력해주세요."
              required
            />

            <p>비밀번호</p>

            <div className="input_wrap">
              <input
                type="password"
                name="pass"
                id="password"
                placeholder="비밀번호를 입력하세요"
                required
              />
              <span className="toggle-password" onClick="togglePassword()">
                🔒
              </span>
            </div>

            <div className="select_box">
              <label className="switch">
                <input type="checkbox" name="remember" />
                <span className="slider round"></span>
                자동 로그인
                <div className="find_tag">
                  <a href="#">아이디 찾기ㅣ</a>
                  <a href="#">비밀번호 찾기</a>
                </div>
              </label>

              <button type="submit" className="login_btn">
                로그인
              </button>
            </div>
          </form>

          <div id="social_login">
            <img src="/images/user/kakao_small.png" alt="카카오 로그인" />

            <img src="/images/user/naver_small.png" alt="네이버 로그인" />

            <img src="/images/user/google_small.png" alt="구글 로그인" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

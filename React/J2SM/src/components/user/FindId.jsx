import React from "react";

const FindId = () => {
  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <img src="/images/logo.png" alt="로고" />
        <div>
          <p class="txt_title">아이디찾기</p>
          <form action="#" id="login">
            <div class="signUp">
              <label for="hp">휴대폰</label>
              <input
                type="text"
                name="hp"
                class="m-10"
                placeholder="휴대폰 번호를 입력해주세요."
                required
              />
              <label for="hpCheck">휴대폰 인증</label>
              <input
                type="text"
                name="hpCheck"
                class="m-10"
                placeholder="코드번호 입력해주세요."
                required
              />
            </div>
            <button type="submit" class="login_btn">
              아이디찾기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindId;

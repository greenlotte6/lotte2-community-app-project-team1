import React from "react";

const FindPass = () => {
  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <img src="/images/logo.png" alt="로고" />
        <div>
          <p class="txt_title">비밀번호찾기</p>
          <form action="#" id="login">
            <div class="signUp">
              <label for="email">이메일</label>
              <input
                type="text"
                name="email"
                class="m-10"
                placeholder="이메일을 입력해주세요."
                required
              />

              <label for="emailCheck">이메일 인증</label>
              <input
                type="text"
                name="emailCheck"
                class="m-10"
                placeholder="인증 번호 입력해주세요."
                required
              />
            </div>

            <div class="pass_result">
              <div class="input_wrap">
                <label for="pass">새 비밀번호</label>
                <input
                  type="password"
                  name="pass"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>

              <div class="input_wrap">
                <label for="pass2">비밀번호 확인</label>
                <input
                  type="password"
                  name="pass2"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>

            <button type="submit" class="login_btn">
              비밀번호 찾기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPass;

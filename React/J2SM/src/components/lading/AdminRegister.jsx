import React from "react";

const AdminRegister = () => {
  return (
    <div class="buy_form_2">
      <div class="container">
        <h1 class="step-title">구매 완료</h1>
        <p class="step-desc">
          구매가 성공적으로 완료되었습니다. 아래에서 관리자 계정을 설정해주세요.
        </p>
        <div class="form-group">
          <label for="userid">아이디</label>
          <div class="id-field">
            <input
              class="register-input"
              type="text"
              id="userid"
              placeholder="아이디를 입력하세요"
            />
            <button class="btn-check">중복 확인</button>
          </div>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            class="register-input"
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button class="btn-next">다음 단계로 이동</button>
      </div>
    </div>
  );
};

export default AdminRegister;

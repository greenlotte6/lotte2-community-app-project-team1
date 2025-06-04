import React from "react";
import { useNavigate } from "react-router-dom";

const Qna = () => {
  const navigate = useNavigate();

  const submitHandler = () => {
    navigate("/qna/view");
  };

  return (
    <div class="contact-container">
      <h3 class="contact-title">문의하기</h3>
      <p class="contact-subtitle">문의하실 내용을 입력해주세요.</p>

      <form onSubmit={submitHandler}>
        <div class="contact-form-box">
          <div>
            <p class="contact-label">회사 이름</p>
            <input type="text" name="companyName" class="contact-input" />

            <p class="contact-label">업종</p>
            <input type="text" name="industry" class="contact-input" />

            <div class="contact-row">
              <div>
                <p class="contact-label">이름</p>
                <input type="text" name="username" class="contact-input" />
              </div>
              <div>
                <p class="contact-label">이메일</p>
                <input type="email" name="email" class="contact-input" />
              </div>
            </div>

            <p class="contact-label">임시 비밀번호</p>
            <input type="password" name="tempPassword" class="contact-input" />

            <p class="contact-label">문의사항</p>
            <textarea name="message" class="contact-textarea"></textarea>

            <button type="submit" class="contact-button">
              문의 하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Qna;

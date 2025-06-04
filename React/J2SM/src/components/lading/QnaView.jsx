import React from "react";

const QnaView = () => {
  return (
    <div className="qnaView">
      <h2 className="qna-title">문의 상세 내역</h2>
      <p className="qna-subtitle">문의하실 내용을 입력해주세요.</p>

      <div className="qna-box">
        <button className="close-button">×</button>

        <section className="qna-section">
          <h4 className="qna-section-title">회사 정보</h4>
          <div className="qna-field">
            <p className="qna-label">회사 이름</p>
            <p className="qna-value font-bold">그린 컴퓨터 아카데미</p>
          </div>
          <div className="qna-field">
            <p className="qna-label">이름</p>
            <p className="qna-value font-bold">그린컴</p>
          </div>
          <div className="qna-field">
            <p className="qna-label">문의 내역</p>
            <input type="text" className="qna-input" placeholder="문의 내역" />
          </div>
        </section>

        <hr className="divider" />

        <section className="qna-section">
          <h4 className="qna-section-title">담당자 정보</h4>
          <div className="qna-field">
            <p className="qna-label">이름</p>
            <p className="qna-value">관리자</p>
          </div>
          <div className="qna-field">
            <p className="qna-label">이메일</p>
            <p className="qna-value text-blue-600">green@gmail.com</p>
          </div>
          <div className="qna-field">
            <p className="qna-label">휴대폰</p>
            <p className="qna-value font-semibold">010-1212-1744</p>
          </div>
          <div className="qna-field">
            <p className="qna-label">답변 내역</p>
            <input type="text" className="qna-input" placeholder="답변 내역" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default QnaView;

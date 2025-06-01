import React from "react";
import { useNavigate } from "react-router-dom";

const CreditResult = () => {
  const navigate = useNavigate();

  const move = () => {
    navigate("/credit/register");
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="buy" style={{ marginTop: "270px" }}>
        <div className="icon"></div>
        <h2>구매 완료</h2>
        <p>
          구매가 성공적으로 완료되었습니다. 아래에서 관리자 계정을 설정해주세요.
        </p>
        <button onClick={move}>아이디와 비밀번호 직접 입력</button>
      </div>
    </div>
  );
};

export default CreditResult;

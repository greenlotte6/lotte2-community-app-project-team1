import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postMemberShip } from "../../api/userAPI";

const CreditSuccess = () => {
  const [params] = useSearchParams();
  const pgToken = params.get("pg_token");

  const navigate = useNavigate();

  useEffect(() => {
    const approve = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/pay/success?pg_token=${pgToken}`
        );
        const data = await res.json();
        console.log("결제 승인 결과:", data);

        // ✅ 성공 메시지 띄우거나 주문 완료 페이지로 이동
      } catch (err) {
        console.error("결제 승인 실패", err);
      }
    };

    if (pgToken) approve();
  }, [pgToken]);

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

export default CreditSuccess;

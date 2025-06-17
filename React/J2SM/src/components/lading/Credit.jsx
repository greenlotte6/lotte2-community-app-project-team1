import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postMemberShip } from "../../api/userAPI";
import { KAKAO_CREDIT } from "../../api/_http";

const Credit = () => {
  const navigate = useNavigate();

  const result = async () => {
    const fetchData = async () => {
      try {
        const data = await postMemberShip(type);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    if (type !== "free") {
      try {
        const res = await fetch(KAKAO_CREDIT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // ✅ 현재 페이지 도메인을 host로 보냄
          body: JSON.stringify({
            itemName: "테스트 상품",
            quantity: 1,
            totalAmount: 10000,
          }),
        });

        const data = await res.json();
        console.log("결제 페이지 이동:", data.next_redirect_pc_url);

        // ✅ 카카오페이 결제창으로 이동
        window.location.href = data.next_redirect_pc_url;
      } catch (err) {
        console.error("카카오페이 결제 준비 실패", err);
      }
    } else {
      navigate("/credit/result");
    }
  };

  const [queryParms] = useSearchParams();

  const type = queryParms.get("type");
  let price = 0;

  switch (type) {
    case "Basic":
      price = 9900;
      break;

    case "Standard":
      price = 19900;
      break;

    case "Premium":
      price = 34900;
      break;

    default:
      price = 0;
  }

  const buttonText = type === "free" ? "체험하기" : "결제하기";

  console.log(type);

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="buy_end">
        <div className="shadow">
          <div className="icon"></div>
          <h2>{type} 요금제 결제</h2>
          <p>결제 금액: {price}원 -선택한 요금제로 결제를 진행하세요.</p>
          <button onClick={result}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
};

export default Credit;

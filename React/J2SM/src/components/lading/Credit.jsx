import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Credit = () => {
  const navigate = useNavigate();

  const result = () => {
    navigate("/credit/result");
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

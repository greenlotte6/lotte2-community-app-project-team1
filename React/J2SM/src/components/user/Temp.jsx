import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import axios from "axios";
import { TEMP } from "../../api/_http";
import { useNavigate } from "react-router-dom";

const Temp = () => {
  const navigate = useNavigate();
  const [terms, setTerms] = useState({
    terms: "",
  });

  useEffect(() => {
    axios
      .get(TEMP) // ✅ 약관 데이터 불러오는 엔드포인트 (수정 가능)
      .then((res) => {
        setTerms(res.data); // { terms: "...", privacy: "..." }
      })
      .catch((err) => {
        console.error("약관 불러오기 실패", err);
      });
  }, []);

  const submitHandler = (e) => {
    navigate("/register");
  };

  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <Logo />
        <div>
          <p className="txt_title">약관동의</p>
          <form id="login" onSubmit={submitHandler}>
            <div className="signUp">
              <div className="terms_box">
                <h4
                  style={{
                    marginBottom: "15px",
                    fontSize: "16px",
                    color: "#2f2f2f",
                  }}
                >
                  이용약관
                </h4>

                <textarea
                  readOnly
                  value={terms.terms}
                  rows={12}
                  className="terms"
                />

                <label
                  style={{
                    display: "flex",
                    justifyContent: "space-between", // 체크박스와 텍스트를 양 끝으로
                    alignItems: "center",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  <span>이용약관에 동의합니다.</span>
                  <input
                    type="checkbox"
                    required
                    style={{
                      width: "16px",
                      height: "16px",
                      accentColor: "#2f80ed", // 선택 시 색상
                    }}
                  />
                </label>
              </div>
            </div>

            <button type="submit" className="login_btn">
              약관동의
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Temp;

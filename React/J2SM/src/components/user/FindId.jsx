import React, { useState } from "react";
import Logo from "./Logo";
import { checkHp } from "../../api/userAPI";
import { useUserValid } from "../../contexts/UserValidContext";
import { useNavigate } from "react-router-dom";

const FindId = () => {
  const navigate = useNavigate();
  const move = () => {
    navigate("/user/findid/result");
  };

  const { hp: contextHp, setHp: setContextHp } = useUserValid();
  const [hp, setHp] = useState();
  const [btnText, setText] = useState("휴대폰 인증");
  const [hpValidResult, setHpValidResult] = useState({ text: "", color: "" });
  const [hpCheck, setHpCheck] = useState(false);

  const changeHandler = (e) => {
    e.preventDefault();

    // 입력 필드 변경시 상태 업데이트
    setHp(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // 휴대폰 인증(첫번째 로직: 휴대폰 번호가 존재하는 확인)
    if (!hpCheck) {
      console.log("휴대폰 인증 절차 : 1");
      const fetchData = async () => {
        try {
          // 세션에 아이디, 비밀번호 저장
          const data = await checkHp(hp);
          console.log(data);

          if (data) {
            setHpCheck(true);
            setHpValidResult({
              text: "인증에 성공하셨습니다.",
              color: "green",
            }); // 휴대폰 검증 결과
            setText("인증번호 인증"); // 버튼 텍스트
          } else {
            setHpValidResult({
              text: "존재하지 않는 휴대폰 번호입니다.",
              color: "red",
            });
          }
          return data;
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
      return;
    }

    console.log("휴대폰 인증 절차 : 2");
    setContextHp(hp); // 컨텍스트에 전화번호 저장
    move();
  };

  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <Logo />
        <div>
          <p class="txt_title">아이디찾기</p>
          <form onSubmit={submitHandler} id="login">
            <div class="signUp">
              <label for="hp">휴대폰</label>
              <input
                type="text"
                name="hp"
                class="m-10"
                placeholder="휴대폰 번호를 입력해주세요."
                onChange={changeHandler}
                required
              />
              <span style={{ color: hpValidResult.color }}>
                {hpValidResult.text}
              </span>

              <div
                className="hpValid"
                style={{ display: hpCheck ? "block" : "none" }}
              >
                <label for="hpCheck">휴대폰 인증</label>
                <input
                  type="text"
                  name="hpCheck"
                  class="m-10"
                  placeholder="코드번호 입력해주세요."
                />
              </div>
            </div>
            <button type="submit" class="login_btn">
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindId;

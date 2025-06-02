import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmail, EmailCodeValid, EmailSend } from "../../api/userAPI";

const EmailValid = () => {
  const navigate = useNavigate();
  let validText = "";
  const [userEmailCheck, setUserEmailCheck] = useState(false);
  const [code, setCode] = useState();
  const [emailSpan, setEmailSpan] = useState({ text: "", color: "" });
  const [emailValidSpan, setEmailValidSpan] = useState({ text: "", color: "" });

  // 이메일 전송 버튼을 눌렀을 때 창 생성
  const [showEmailValid, setShowEmailValid] = useState(false);

  const move = () => {
    navigate("/credit/email");
  };

  const [email, setEmail] = useState();

  const emailChangeHandler = (e) => {
    const value = e.target.value;
    setEmail(value); // 상태는 그대로 저장하고

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value)) {
      const fetchData = async () => {
        try {
          // 세션에 아이디, 비밀번호 저장
          const data = await checkEmail(value);

          console.log(data);

          if (data) {
            setEmailSpan({ text: "중복된 이메일입니다.", color: "red" });
            setUserEmailCheck(false);
          } else {
            setEmailSpan({ text: "사용 가능한 이메일입니다.", color: "green" });
            setUserEmailCheck(true);
          }
        } catch (err) {
          console.error(err);
        }
      };

      const exist = fetchData();
    } else {
      setEmailSpan({ text: "이메일 양식을 확인해주세요.", color: "red" });
    }
  };

  const emailSendHandler = (e) => {
    e.preventDefault();
    if (userEmailCheck) {
      setShowEmailValid(true);

      const fetchData = async () => {
        try {
          // 세션에 아이디, 비밀번호 저장
          const data = await EmailSend(email);
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
      alert("인증번호가 전송되었습니다.");
    } else {
      alert("이메일 양식을 작성해주세요.");
    }
  };

  const codeChangeHandler = (e) => {
    setCode(e.target.value);
    console.log(e.target.value);
  };

  const emailValidHandler = (e) => {
    if (userEmailCheck) {
      const fetchData = async () => {
        try {
          // 코드 검증 -> 이메일의 코드와 같아야한다.
          const data = await EmailCodeValid(code);

          if (data == "인증 성공") {
            alert("인증 성공");
          } else {
            alert("인증 실패");
          }
          console.log(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    } else {
      alert("이메일 양식을 작성해주세요.");
    }
  };

  return (
    <div className="buy_form_1">
      <div className="buy_form">
        <p className="buy_title">이메일 인증</p>
        <p className="step-desc">이메일 인증을 진행해주세요.</p>
        <p className="buy_input">이메일 주소</p>
        <input
          className="inp"
          type="text"
          name="email"
          placeholder="이메일 주소"
          onChange={emailChangeHandler}
        />
        <span style={{ color: emailSpan.color }}>{emailSpan.text}</span>
        <div
          className="email_valid"
          style={{ display: showEmailValid ? "block" : "none" }}
        >
          <p className="buy_input">인증번호 검증</p>
          <input
            className="inp"
            type="text"
            name="email"
            placeholder="인증번호"
            onChange={codeChangeHandler}
          />
          <span style={{ color: emailValidSpan.color }}>
            {emailValidSpan.text}
          </span>
        </div>

        <div>
          <button className="btn1" onClick={emailSendHandler}>
            이메일 전송
          </button>{" "}
          <br />
          <button className="btn2" onClick={emailValidHandler}>
            이메일 인증
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailValid;

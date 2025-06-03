import React, { use, useState } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import {
  checkEmail,
  EmailCodeValid,
  EmailSend,
  postModifyPass,
} from "../../api/userAPI";

const initState = {
  email: "",
  pass: "",
};

const FindPass = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ ...initState });

  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [passSpan, setPassSpan] = useState({ text: "", color: "" });
  const [pass1, setPass1] = useState();
  const [pass2, setPass2] = useState();
  const [checkTextV1, setCheckTextV1] = useState({ text: "", color: "" });
  const [emailAuth, setEmailAuth] = useState(false);
  const [emailCodeAuth, setEmailCodeAuth] = useState(false);
  const [userPassCheck, setUserPassCheck] = useState(false);
  const [btnText, setText] = useState("이메일 인증코드");

  const move = () => {
    navigate("/user/login");
  };

  const moveHandler = () => {
    move();
  };

  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
    setUser({ ...user, email: e.target.value });
  };

  const changePass1Handler = (e) => {
    setPass1(e.target.value);
    passValid(e.target.value);
    setUser({ ...user, pass: e.target.value });
  };

  const changePass2Handler = (e) => {
    setPass2(e.target.value);
  };

  const changeCodeHandler = (e) => {
    setCode(e.target.value);
  };

  // 비밀번호 양식 검증
  const passValid = (data) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordRegex.test(data)) {
      setPassSpan({
        text: "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.",
        color: "red",
      });
      setUserPassCheck(false);
    } else {
      setPassSpan({
        text: "사용 가능한 비밀번호입니다.",
        color: "green",
      });
      setUserPassCheck(true);
    }
  };

  const emailSend = () => {
    const fetchEmailData = async () => {
      try {
        // 세션에 아이디, 비밀번호 저장
        const data = await EmailSend(email);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmailData();
  };

  // 코드 검증
  const validCode = () => {
    const fetchData = async () => {
      try {
        // 코드 검증 -> 이메일의 코드와 같아야한다.
        const data = await EmailCodeValid(code);

        if (data == "인증 성공") {
          setEmailCodeAuth(true);
          setCheckTextV1({
            text: "인증에 성공하셨습니다.",
            color: "green",
          });
          setText("비밀번호 변경"); // 버튼 텍스트
        } else {
          setCheckTextV1({
            text: "인증 코드가 맞지 않습니다.",
            color: "red",
          });
          alert("인증실패");
        }

        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // 이메일 검증 후 인증번호 전송까지
    if (!emailAuth) {
      console.log("이메일 인증 절차 : 1");
      const fetchData = async () => {
        try {
          // 세션에 아이디, 비밀번호 저장
          const data = await checkEmail(email);
          console.log(data);

          if (data) {
            setCheckTextV1({
              text: "인증번호가 전송 되었습니다.",
              color: "green",
            }); // 휴대폰 검증 결과
            setText("인증번호 인증"); // 버튼 텍스트

            // 이메일 인증번호 전송
            emailSend();
          } else {
            setEmailAuth(false);
            setCheckTextV1({
              text: "존재하지 않는 이메일입니다.",
              color: "red",
            });
          }
          return data;
        } catch (err) {
          console.error(err);
        }
      };

      // 인증 절차 : 2
      fetchData();
      setEmailAuth(true);
      return;
    }

    // 인증코드 검증
    if (!emailCodeAuth) {
      validCode();
      return;
    }

    // 비밀번호 재설정
    if (userPassCheck) {
      if (pass1 != pass2) {
        setPassSpan({
          text: "비밀번호가 서로 다릅니다.",
          color: "red",
        });
        return;
      }

      console.log(user);
      const fetchModifyData = async () => {
        try {
          // 세션에 아이디, 비밀번호 저장
          const data = await postModifyPass(user);
          navigate("/user/login");
          console.log(data);
        } catch (err) {
          alert("비밀번호 변경 실패");
          console.error(err);
        }
      };

      fetchModifyData();
    }
  };

  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <Logo />
        <div>
          <p className="txt_title">비밀번호찾기</p>
          <form id="login">
            <div className="signUp">
              <label for="email">이메일</label>
              <input
                type="text"
                name="email"
                className="m-10"
                placeholder="이메일을 입력해주세요."
                onChange={changeEmailHandler}
                required
              />

              <div style={{ display: emailAuth ? "block" : "none" }}>
                <label for="emailCheck">이메일 인증</label>
                <input
                  type="text"
                  name="emailCheck"
                  className="m-10"
                  placeholder="인증 번호 입력해주세요."
                  onChange={changeCodeHandler}
                  required
                />
              </div>
              <p style={{ color: checkTextV1.color }}>{checkTextV1.text}</p>
            </div>

            <div style={{ display: emailCodeAuth ? "block" : "none" }}>
              <div className="pass_result">
                <div className="input_wrap">
                  <label for="pass">새 비밀번호</label>
                  <input
                    type="password"
                    name="pass"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={changePass1Handler}
                    required
                  />
                </div>

                <div className="input_wrap">
                  <label for="pass2">비밀번호 확인</label>
                  <input
                    type="password"
                    name="pass2"
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={changePass2Handler}
                    required
                  />
                </div>
              </div>
              <span style={{ color: passSpan.color }}>{passSpan.text}</span>
            </div>

            <button onClick={submitHandler} className="login_btn">
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindPass;

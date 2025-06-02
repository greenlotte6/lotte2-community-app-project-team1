import React, { useState } from "react";
import { checkId, checkIdSuccess } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";

const initState = {
  uid: "",
  pass: "",
};

const AdminRegister = () => {
  const navigate = useNavigate();

  const move = () => {
    navigate("/credit/email");
  };

  const [userIdCheck, setUserIdCheck] = useState(false);
  const [userPassCheck, setUserPassCheck] = useState(false);

  const [user, setUser] = useState({ ...initState });

  const [userSpan, setUserSpan] = useState({ text: "", color: "" });
  const [passSpan, setPassSpan] = useState({ text: "", color: "" });

  const userCheckHandler = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const data = await checkId(user);
        console.log(data);

        if (data) {
          setUserSpan({ text: "중복된 아이디입니다.", color: "red" });
          setUserIdCheck(false);
        } else {
          setUserSpan({ text: "사용가능한 아이디입니다.", color: "green" });
          setUserIdCheck(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  };

  // 핸들러
  const changeHandler = (e) => {
    e.preventDefault();

    // 입력 필드 변경시 상태 업데이트
    setUser({ ...user, [e.target.name]: e.target.value });
    const { name, value } = e.target;

    if (name === "pass") {
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if (!passwordRegex.test(value)) {
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
    }
  };

  const moveHandler = () => {
    if ((userIdCheck == true) & (userPassCheck == true)) {
      const fetchData = async () => {
        try {
          // 세션에 아이디, 비밀번호 저장
          const data = await checkIdSuccess(user);
          console.log(data);

          // 페이지 이동
          move();
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    } else {
      alert("아이디 양식을 다시 확인해주세요.");
    }
  };

  return (
    <div className="buy_form_2">
      <div className="container">
        <h1 className="step-title">구매 완료</h1>
        <p className="step-desc">
          구매가 성공적으로 완료되었습니다. 아래에서 관리자 계정을 설정해주세요.
        </p>
        <div className="form-group">
          <label for="userid">아이디</label>
          <div className="id-field">
            <input
              className="register-input"
              type="text"
              name="uid"
              id="userid"
              placeholder="아이디를 입력하세요"
              onChange={changeHandler}
            />
            <button className="btn-check" onClick={userCheckHandler}>
              중복 확인
            </button>
          </div>
          <span style={{ color: userSpan.color }}>{userSpan.text}</span>
        </div>
        <div className="form-group">
          <label for="password">비밀번호</label>
          <input
            className="register-input"
            type="password"
            id="password"
            name="pass"
            placeholder="비밀번호를 입력하세요"
            onChange={changeHandler}
          />
          <span style={{ color: passSpan.color }}>{passSpan.text}</span>
        </div>
        <button className="btn-next" onClick={moveHandler}>
          다음 단계로 이동
        </button>
      </div>
    </div>
  );
};

export default AdminRegister;

import React, { useState } from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useUserValid } from "../../contexts/UserValidContext";
import { getUidByHp } from "../../api/userAPI";

const FindIdResult = () => {
  const navigate = useNavigate();
  const { hp } = useUserValid();

  const loginHandler = (e) => {
    e.preventDefault();
    navigate("/user/login");
  };

  const findPassHandler = (e) => {
    e.preventDefault();
    navigate("/user/findpass");
  };

  const [uid, setUid] = useState();

  const fetchData = async () => {
    try {
      // 로그인
      const data = await getUidByHp(hp);
      setUid(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();

  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <Logo />
        <div>
          <p className="txt_title">아이디찾기</p>
          <p className="txt_subtitle">아이디 찾기 결과</p>
          <p className="txt_sub">아이디 찾기 결과를 확인해주세요.</p>

          <div className="find">
            <label for="email">아이디 : </label>

            <input
              type="text"
              name="email"
              className="m-10"
              value={uid || ""}
              disabled
              readonly
            />
          </div>

          <button className="login_btn" onClick={loginHandler}>
            로그인
          </button>

          <button className="login_btn" onClick={findPassHandler}>
            비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindIdResult;

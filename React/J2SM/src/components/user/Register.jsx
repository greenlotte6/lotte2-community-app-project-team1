import React, { useState } from "react";
import Logo from "./Logo";
import { checkId } from "../../api/userAPI";
import { USER_INVITE_CODE } from "../../api/_http";

const Register = () => {
  const [userIdCheck, setUserIdCheck] = useState(false);
  const [userPassCheck, setUserPassCheck] = useState(false);
  const [userSpan, setUserSpan] = useState({ text: "", color: "" });
  const [passSpan, setPassSpan] = useState({ text: "", color: "" });
  const [form, setForm] = useState({
    name: "",
    uid: "",
    tempcode: "",
    pass: "",
    pass2: "",
    rdate: "",
    profile: null,
  });

  // 아이디 체크
  const userCheckHandler = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      try {
        const data = await checkId(form);
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

  // 암호 번호 체크
  const inviteCheckHandler = (e) => {
    e.preventDefault();
    console.log(form.tempcode);
    const fetchData = async () => {
      try {
        const data = await USER_INVITE_CODE(form.tempcode);
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

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

    if (name === "pass2" && userPassCheck === true) {
      if (form.pass !== e.target.value) {
        setPassSpan({
          text: "비밀번호가 서로 다릅니다.",
          color: "red",
        });
      } else {
        setPassSpan({
          text: "",
          color: "green",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.pass !== form.pass2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 실제 등록 로직 작성 위치
    console.log("회원가입 정보:", form);

    alert("회원가입 완료 (예시)");
  };

  return (
    <div id="user_page">
      <img src="/images/user/login.jpg" alt="로그인 화면" />
      <div id="login_form">
        <Logo />
        <div>
          <p className="txt_title">회원가입</p>
          <form onSubmit={handleSubmit} id="login">
            <div className="signUp">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                className="m-10"
                placeholder="이름을 입력해주세요."
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="uid">아이디</label>
              <input
                type="text"
                name="uid"
                className="m-10"
                placeholder="아이디를 입력해주세요."
                value={form.uid}
                onChange={handleChange}
                onBlur={userCheckHandler}
                required
              />
              <span style={{ color: userSpan.color }}>{userSpan.text}</span>
              <p></p>

              <label htmlFor="tempcode">암호 번호</label>
              <input
                type="text"
                name="tempcode"
                className="m-10"
                placeholder="암호 번호를 입력해주세요."
                value={form.tempcode}
                onChange={handleChange}
                onBlur={inviteCheckHandler}
                required
              />

              <div className="input_wrap">
                <label htmlFor="pass">비밀번호</label>
                <input
                  type="password"
                  name="pass"
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  value={form.pass}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input_wrap">
                <label htmlFor="pass2">비밀번호 확인</label>
                <input
                  type="password"
                  name="pass2"
                  id="passwordConfirm"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={form.pass2}
                  onChange={handleChange}
                  required
                />
                <span style={{ color: passSpan.color }}>{passSpan.text}</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rdate">입사일</label>
                  <input
                    type="date"
                    name="rdate"
                    id="rdate"
                    value={form.rdate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile">프로필 사진</label>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="login_btn">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

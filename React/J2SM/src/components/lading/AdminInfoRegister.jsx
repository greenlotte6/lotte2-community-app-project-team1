import React, { useRef, useState } from "react";
import { postUser } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";

const initState = {
  name: "",
  hp: "",
  company: "",
};

const AdminInfoRegister = () => {
  const navigate = useNavigate();

  const move = () => {
    navigate("/user/login");
  };

  const [user, setUser] = useState({ ...initState });
  const refProfile = useRef();

  const changeHandler = (e) => {
    e.preventDefault();

    // 입력 필드 변경시 상태 업데이트
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 제출
  const submitHandler = (e) => {
    e.preventDefault();

    // 첨부 이미지 가져오기
    const profile = refProfile.current.files[0];

    const formData = new FormData();
    formData.append("profile", profile);

    // 상태값 폼데이터 추가
    // k는 key, user[k]는 value
    for (const k in user) {
      formData.append(k, user[k]);
    }

    // 서버 전송
    const fetchData = async () => {
      try {
        // 상품 등록 요청
        const data = await postUser(formData);
        console.log(data);

        // 요청 후 로그인 창으로
        move();
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  };

  return (
    <div id="infoRegister">
      <div className="buy_form_1">
        <p className="h3">회사 및 대표 설정</p>
        <p className="texts">회사이름</p>
        <input
          type="text"
          name="company"
          className="input-default"
          onChange={changeHandler}
        />
        <p className="texts">대표이름</p>
        <input
          type="text"
          name="name"
          className="input-default"
          onChange={changeHandler}
        />
        <p className="texts">전화번호</p>
        <input
          type="text"
          name="hp"
          className="input-default"
          onChange={changeHandler}
        />
        <p className="texts">프로필 이미지</p>
        <input
          type="file"
          name="profile"
          ref={refProfile}
          className="input-default"
          required
        />
        <div>
          <button className="btn" onClick={submitHandler}>
            설정완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoRegister;

import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { COMPANY, USER_INVITE } from "../../../api/_http";

const InviteModal = ({ onClose }) => {
  const { company } = useAuth();
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [dtext, setDtext] = useState();
  const [etext, setEtext] = useState();

  const [departments, setDepartments] = useState([]); // 부서 목록 상태
  // 부서 정보 가져오기
  useEffect(() => {
    if (!company) return;

    const cno = company.split(":")[0];
    console.log("cno 추출됨:", cno);

    axios
      .get(COMPANY.DEPARTMENT.LIST(cno)) // cno 사용
      .then((res) => setDepartments(res.data))
      .catch((err) => {
        console.error("부서 목록 불러오기 실패", err);
        setDepartments([]);
      });
  }, [company]);

  const modalRef = useRef(null);

  if (!company) return null;
  const companyName = company.split(":")[1];
  const cno = company.split(":")[0];

  const closeModal = () => {
    if (modalRef.current) modalRef.current.style.display = "none";
  };

  const departmentHandler = (e) => {
    const value = e.target.value;
    setDepartment(value);
    console.log(value);
    console.log(departments);

    // 부서명만 추출 (예: departments = [{ name: "Backend" }, ...])
    const deptNames = departments.map((dept) => dept.departmentName);
    console.log(deptNames);
    if (deptNames.includes(value.trim())) {
      setDtext("");
    } else {
      setDtext("등록되지 않은 부서입니다.");
    }
  };

  const emailHandler = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setEtext("");
    } else {
      setEtext("❌ 이메일 형식이 올바르지 않습니다.");
    }
  };

  const positionHandler = (e) => setPosition(e.target.value);
  const nameHandler = (e) => setName(e.target.value);

  // 초대하기
  const handleInvite = async () => {
    const inviteData = {
      inviteCode: 0, // 기본값 또는 서버에서 처리
      company: companyName,
      department,
      position,
      name,
      email,
    };

    try {
      const res = await axios.post(USER_INVITE, inviteData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      alert("초대가 완료되었습니다.");
      onClose(); // 모달 닫기
    } catch (err) {
      console.error("초대 실패", err);
      alert("초대에 실패했습니다.");
    }
  };

  return (
    <div className="modalContent" style={{ whiteSpace: "normal" }}>
      <h3>사원 초대</h3>
      <input
        type="text"
        placeholder="회사명 입력"
        readOnly
        value={companyName}
      />
      <input
        type="text"
        placeholder="부서 입력"
        value={department}
        onChange={departmentHandler}
      />
      <p></p>
      <span style={{ color: "red" }}>{dtext}</span>
      <input
        type="text"
        placeholder="직책 입력"
        value={position}
        onChange={positionHandler}
      />
      <input
        type="text"
        placeholder="성명 입력"
        value={name}
        onChange={nameHandler}
      />
      <input
        type="text"
        placeholder="이메일 입력"
        value={email}
        onChange={emailHandler}
      />
      <p></p>
      <span style={{ color: "red" }}>{etext}</span>
      <div className="modalButtons">
        <button type="button" id="inviteConfirmBtn" onClick={handleInvite}>
          초대
        </button>
        <button type="button" id="inviteCancelBtn" onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default InviteModal;

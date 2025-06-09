import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../api/_http";
import useAuth from "../../../hooks/useAuth";
import "../../../styles/Chatting/ChatRoomCreateModal.scss";

export default function ChatRoomCreateModal({
  isOpen,
  onClose,
  onCreated,
  currentUserId,
}) {
  const { username, company } = useAuth();

  const [step, setStep] = useState("selectType");
  const [channelType, setChannelType] = useState(null); // 'private' or 'group'
  const [userGroups, setUserGroups] = useState([]); // 부서별 사용자 묶음
  const [selected, setSelected] = useState([]);
  // New state to manage collapsed/expanded departments
  const [expandedDepartments, setExpandedDepartments] = useState({});

  // 모달 초기화
  useEffect(() => {
    if (!isOpen) {
      setStep("selectType");
      setChannelType(null);
      setUserGroups([]);
      setSelected([]);
      setExpandedDepartments({}); // Reset expanded departments on close
    }
  }, [isOpen]);

  // 2단계: 초대할 사용자 목록 부서별로 불러오기
  useEffect(() => {
    if (isOpen && step === "invite" && company) {
      axios
        .get(API.CHAT.USER_LIST(company))
        .then((res) => {
          // res.data: [{ departmentName, users: [...] }, ...]
          const groups = res.data.map((grp) => ({
            departmentName: grp.departmentName,
            users: grp.users
              .filter((u) => u.uid !== currentUserId)
              .map((u) => ({ ...u, departmentName: grp.departmentName })),
          }));
          setUserGroups(groups);
          setSelected([]);
          // Initialize all departments as collapsed by default
          const initialExpandedState = {};
          groups.forEach((grp) => {
            initialExpandedState[grp.departmentName] = false;
          });
          setExpandedDepartments(initialExpandedState);
        })
        .catch(console.error);
    }
  }, [isOpen, step, currentUserId, company]);

  const handleTypeSelect = (type) => {
    setChannelType(type);
    setStep("invite");
  };

  const handleSelectUser = (user) => {
    if (channelType === "private" && selected.length >= 1) return;
    setSelected((prev) => [...prev, user]);
    // 선택된 유저를 부서 그룹에서 제거
    setUserGroups((prev) =>
      prev.map((grp) =>
        grp.departmentName === user.departmentName
          ? { ...grp, users: grp.users.filter((u) => u.uid !== user.uid) }
          : grp
      )
    );
  };

  const handleRemoveUser = (user) => {
    setSelected((prev) => prev.filter((u) => u.uid !== user.uid));
    // 제거된 유저를 다시 해당 부서 그룹에 추가
    setUserGroups((prev) =>
      prev.map((grp) =>
        grp.departmentName === user.departmentName
          ? { ...grp, users: [...grp.users, user] }
          : grp
      )
    );
  };

  const handleCreate = () => {
    const name =
      channelType === "private"
        ? selected[0]?.name || "개인 채널"
        : "단체 채널";
    const payload = {
      name,
      participants: [currentUserId, ...selected.map((u) => u.uid)],
    };
    axios
      .post(API.CHAT.CREATE_ROOM, payload)
      .then((res) => {
        onCreated(res.data);
        onClose();
      })
      .catch(() => alert("채널 생성에 실패했습니다."));
  };

  // Function to toggle the expanded state of a department
  const handleToggleDepartment = (departmentName) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [departmentName]: !prev[departmentName],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {step === "selectType" ? (
          <>
            <h2 className="modal-title">채팅방 생성</h2>
            <div className="modal-options">
              <div
                className="card card--private"
                onClick={() => handleTypeSelect("private")}
              >
                <div className="card-header">
                  <span className="card-icon">👤</span>
                  <h3>개인 채널</h3>
                </div>
                <ul className="card-list">
                  <li>1:1로 대화를 나눌 수 있습니다.</li>
                  <li>무료 회원은 3명까지만 DM이 가능합니다.</li>
                  <li>유료 회원은 무제한으로 DM이 가능합니다.</li>
                  <li>추가된 채널은 카테고리 메뉴에 표시됩니다.</li>
                </ul>
                <button className="btn-primary">대화방 생성</button>
              </div>
              <div
                className="card card--group card--popular"
                onClick={() => handleTypeSelect("group")}
              >
                <div className="badge">Most Popular</div>
                <div className="card-header">
                  <span className="card-icon">👥</span>
                  <h3>단체 채널</h3>
                </div>
                <ul className="card-list">
                  <li>채널 생성자는 자동으로 관리자입니다.</li>
                  <li>다른 회사의 사람도 초대할 수 있습니다.</li>
                  <li>무료 회원은 최대 3명까지 초대 가능합니다.</li>
                  <li>유료 회원은 무제한으로 초대 가능합니다.</li>
                </ul>
                <button className="btn-primary">대화방 생성</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="modal-title">
              {channelType === "private"
                ? "개인 채널 - 상대 선택"
                : "단체 채널 - 사용자 초대"}
            </h2>
            <div className="user-selectors" id="userSelectors">
              <div className="available">
                <h3>초대 가능한 사용자</h3>
                {userGroups.map(
                  (grp) =>
                    grp.users.length > 0 && (
                      <div
                        key={grp.departmentName}
                        className="department-group"
                      >
                        {/* Make the department name clickable to toggle */}
                        <h4
                          onClick={() =>
                            handleToggleDepartment(grp.departmentName)
                          }
                          style={{ cursor: "pointer" }} // Add a pointer cursor for better UX
                        >
                          {grp.departmentName}
                          <span style={{ marginLeft: "10px" }}>
                            {expandedDepartments[grp.departmentName]
                              ? "▼"
                              : "▶"}
                          </span>
                        </h4>
                        {/* Conditionally render the user list */}
                        {expandedDepartments[grp.departmentName] && (
                          <ul className="user-list">
                            {grp.users.map((u) => (
                              <li key={u.uid} className="user-item">
                                <span onClick={() => handleSelectUser(u)}>
                                  {u.name}
                                </span>
                                <button onClick={() => handleSelectUser(u)}>
                                  +
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                )}
              </div>
              <div className="selected">
                <h3>
                  선택된 사용자 ({selected.length}
                  {channelType === "private" ? "/1" : ""})
                </h3>
                <ul className="user-list">
                  {selected.map((u) => (
                    <li key={u.uid} className="user-item">
                      <span>{u.name}</span>
                      <button onClick={() => handleRemoveUser(u)}>×</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="actions">
              <button
                className="btn-secondary"
                onClick={() => setStep("selectType")}
              >
                뒤로
              </button>
              <button
                className="btn-primary"
                disabled={selected.length < 1}
                onClick={handleCreate}
              >
                만들기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

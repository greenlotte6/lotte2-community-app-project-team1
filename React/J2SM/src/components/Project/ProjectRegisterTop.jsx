import React from "react";

export const ProjectRegisterTop = ({ title, setTitle, mode, onSave }) => {
  return (
    <div className="topArea">
      <div className="Title">
        <h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="프로젝트명을 입력하세요"
          />
        </h3>
        <button type="button" className="savebtn" onClick={onSave}>
          <img src="/images/Save.svg" alt="저장" />
        </button>
        <button type="button" id="openInviteModalBtn">
          <img src="/images/user-add.svg" alt="초대" />
        </button>
      </div>

      {mode === "edit" && <span className="editLabel">수정 모드</span>}
      {mode === "create" && <span className="editLabel">신규 등록 모드</span>}
    </div>
  );
};

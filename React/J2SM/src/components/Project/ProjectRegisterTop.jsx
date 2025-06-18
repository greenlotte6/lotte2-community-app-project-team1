import React, { useEffect, useState } from "react";

export const ProjectRegisterTop = ({ projectName }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (projectName) {
      setTitle(projectName); // props로 받은 값 넣기
    }
  }, [projectName]);

  useEffect(() => {
    // (기존 모달 코드 유지)
  }, []);

  return (
    <>
      <div className="topArea">
        <div className="Title">
          <h3>
            {/* ✅ 받아온 이름 사용 */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </h3>
          <button type="button" className="savebtn">
            <img src="/images/Save.svg" alt="useradd" />
          </button>
          <button type="button" id="openInviteModalBtn">
            <img src="/images/user-add.svg" alt="useradd" />
          </button>
        </div>
      </div>
      {/* 모달 그대로 */}
    </>
  );
};

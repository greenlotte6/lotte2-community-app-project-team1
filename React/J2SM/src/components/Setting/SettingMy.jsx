import React, { useEffect, useRef, useState } from "react";
import {
  USER_MODIFY_INFO,
  USER_PASS_MODIFY,
  USER_THUMB,
} from "../../api/_http";
import { getInfo } from "../../api/userAPI";
import useAuth from "../../hooks/useAuth";

export const SettingMy = () => {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { username } = useAuth();

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getInfo();
      setUser(data);
      console.log("📦 유저 데이터:", data);
    };
    fetchUser();
  }, [username]);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 파일 업로드 핸들러
  const handleProfileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const res = await fetch(`${USER_THUMB}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        alert("프로필이 저장되었습니다.");
        window.location.reload(); // 새 이미지 반영
      } else {
        alert("업로드 실패");
      }
    } catch (err) {
      console.error("업로드 에러:", err);
      alert("오류 발생");
    }
  };

  // 사용자 정보 변경
  const handleUserInfoUpdate = async () => {
    try {
      const res = await fetch(`${USER_MODIFY_INFO}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          hp: user.hp,
        }),
      });

      if (res.ok) {
        alert("사용자 정보가 저장되었습니다.");
      } else {
        console.log(user);
        alert("저장 실패");
      }
    } catch (err) {
      console.error("사용자 정보 저장 실패", err);
      alert("오류 발생");
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = async () => {
    // 입력 확인
    if (!user?.currentPass || !user?.newPass || !user?.newPassCheck) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // 비밀번호 체크
    if (user.newPass !== user.newPassCheck) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch(`${USER_PASS_MODIFY}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          pass: user.currentPass,
          newPass: user.newPass,
        }),
      });

      if (res.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setUser((prev) => ({
          ...prev,
          currentPass: "",
          newPass: "",
          newPassCheck: "",
        }));
      } else {
        alert("비밀번호가 맞지 않습니다.");
      }
    } catch (err) {
      console.error("비밀번호 변경 오류:", err);
      alert("오류 발생");
    }
  };

  return (
    <div className="midArea">
      <section>
        <h4>프로필 이미지 변경</h4>
        <div className="semi">
          <img
            src={
              preview ||
              (user?.profileImage ? `${USER_THUMB}/${user.profileImage}` : "")
            }
            className="photoPlaceholder"
            alt="프로필"
          />
          <br />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="profile-btn-group">
            <button
              className="btn btn-select"
              onClick={() => fileInputRef.current.click()}
            >
              이미지 선택
            </button>
            <button className="btn btn-save" onClick={handleProfileUpload}>
              프로필 저장
            </button>
          </div>
        </div>
      </section>

      <section>
        <h4>사용자 정보 변경</h4>
        <div id="user-info-form" className="semi user-info-form">
          <label>이름</label>
          <input
            type="text"
            value={user?.name || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <label>이메일</label>
          <input
            type="email"
            value={user?.email || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <label>전화번호</label>
          <input
            type="tel"
            value={user?.hp || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, hp: e.target.value }))
            }
          />

          <button
            className="btn btn-save"
            onClick={() => handleUserInfoUpdate()}
          >
            사용자 정보 저장
          </button>
        </div>
      </section>

      <section>
        <h4>비밀번호 변경</h4>
        <div id="user-info-form" className="semi user-password-form">
          <label>현재 비밀번호</label>
          <input
            type="password"
            value={user?.currentPass || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, currentPass: e.target.value }))
            }
          />

          <label>새 비밀번호</label>
          <input
            type="password"
            value={user?.newPass || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, newPass: e.target.value }))
            }
          />

          <label>새 비밀번호 확인</label>
          <input
            type="password"
            value={user?.newPassCheck || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, newPassCheck: e.target.value }))
            }
          />

          <button className="btn btn-save" onClick={handlePasswordChange}>
            비밀번호 변경
          </button>
        </div>
      </section>
    </div>
  );
};

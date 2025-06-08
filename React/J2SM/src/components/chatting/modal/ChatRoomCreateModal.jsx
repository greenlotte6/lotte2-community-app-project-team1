// src/components/chat/ChatRoomCreateModal.jsx
import React from "react";
import axios from "axios";
import { API } from "../../../api/_http";
import "../../../styles/Chatting/ChatRoomCreateModal.scss";

export default function ChatRoomCreateModal({
  isOpen,
  onClose,
  onCreated,
  currentUserId,
}) {
  const createRoom = (type) => {
    const name = type === "private" ? "개인 채널" : "단체 채널";
    axios
      .post(API.CHAT.CREATE_ROOM, {
        name,
        participants: [currentUserId],
      })
      .then((res) => {
        onCreated(res.data);
        onClose();
      })
      .catch(() => alert("채널 생성에 실패했습니다."));
  };

  if (!isOpen) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <h2 className="modal-title">채팅방 생성</h2>
        <div className="modal-options">
          {/* 개인 채널 카드 */}
          <div className="card card--private">
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
            <button
              className="btn-primary"
              onClick={() => createRoom("private")}
            >
              대화방 생성
            </button>
          </div>

          {/* 단체 채널 카드 */}
          <div className="card card--group card--popular">
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
            <button className="btn-primary" onClick={() => createRoom("group")}>
              대화방 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

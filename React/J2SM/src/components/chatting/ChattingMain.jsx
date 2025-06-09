// src/components/chat/ChattingMain.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api/_http";

import ChatRoomCreateModal from "./modal/ChatRoomCreateModal";
import useAuth from "../../hooks/useAuth";

export default function ChattingMain({ onSelectRoom, currentUserId }) {
  const { username } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [searchText, setSearchText] = useState("");

  // 모달 열림 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 채팅방 전체 로드
  useEffect(() => {
    axios
      .get(API.CHAT.ROOM_LIST)
      .then((res) => setRooms(res.data))
      .catch(console.error);
  }, []);

  // 내가 속한 채팅방만 필터링
  const myRooms = rooms.filter((room) =>
    Array.isArray(room.participants)
      ? room.participants.includes(currentUserId)
      : false
  );

  // 검색 필터링
  const filtered = myRooms.filter((r) =>
    r.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 모달 열기/닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 모달에서 새 방 생성 완료 시 호출
  const handleCreated = (newRoom) => {
    setRooms((prev) => [...prev, newRoom]);
    closeModal();
    onSelectRoom(newRoom.id); // 바로 생성된 방으로 진입
  };

  return (
    <>
      <div className="topArea">
        <div className="Title">
          <h3>안녕하세요, {username}님!</h3>
        </div>
        <div className="controlBar">
          {/* 검색창 */}
          <input
            type="text"
            placeholder="채팅방 검색..."
            className="searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* 모달 열기 버튼 */}
          <button id="createRoomBtn" className="createBtn" onClick={openModal}>
            + 새 채팅방 만들기
          </button>
        </div>
      </div>

      <div className="categoryContainer">
        {filtered.map((room) => {
          const {
            id,
            name,
            description,
            lastMessage,
            unreadCount,
            participants,
          } = room;
          return (
            <div
              key={id}
              className="categoryItem"
              onClick={() => onSelectRoom(id)}
            >
              <div className="itemLeft">
                <div className="itemTitle">{name}</div>
                <div className="itemDesc">{description || "설명 없음"}</div>
                <div className="lastMessage">
                  {lastMessage
                    ? `[${lastMessage.senderId}] ${lastMessage.text}`
                    : "대화 시작하기"}
                </div>
              </div>
              <div className="itemRight">
                <span className="unreadBadge">{unreadCount ?? 0}</span>
                <div className="participants">
                  {participants.map((uid, i) => (
                    <img key={i} src={`/images/${uid}.png`} alt={uid} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="no-rooms">검색된 채팅방이 없습니다.</div>
        )}
      </div>

      {/* 모달 렌더링 */}
      <ChatRoomCreateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreated={handleCreated}
        currentUserId={currentUserId}
      />
    </>
  );
}

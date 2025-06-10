// src/components/chat/ChattingMain.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../api/_http";

import ChatRoomCreateModal from "./modal/ChatRoomCreateModal";
import useAuth from "../../hooks/useAuth";

export default function ChattingMain({ onSelectRoom, currentUserId }) {
  const { username, nick } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("username 1" + username);

  // 모달 열림 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 채팅방 전체 로드
  useEffect(() => {
    console.log("이펙트");
    if (!username) return;
    console.log("userId UseEffect : " + username);
    axios
      .get(API.CHAT.ROOM_LIST(username))
      .then((res) => setRooms(res.data))
      .catch(console.error);
  }, [username]);

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

  // 정렬 기준 시각 계산
  const getRoomTime = (room) => {
    if (room.lastMessage?.sentAt) {
      return new Date(room.lastMessage.sentAt);
    }
    return new Date(room.createdAt);
  };

  // 정렬: 최근 활동(메시지 or 생성) 순
  const sortedRooms = filtered.slice().sort((a, b) => {
    return getRoomTime(b) - getRoomTime(a);
  });

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
          <h3>안녕하세요, {nick}님!</h3>
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
        {sortedRooms.map((room) => {
          console.log(room);
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
                    ? `[${lastMessage.senderName}] ${lastMessage.text}`
                    : "대화 시작하기"}
                </div>
              </div>
              <div className="itemRight">
                <span className="unreadBadge">{unreadCount ?? 0}</span>
                <div className="participants">
                  {participants.map((uid, i) => (
                    <img key={i} src={`/images/profile2.png`} alt={uid} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {sortedRooms.length === 0 && (
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

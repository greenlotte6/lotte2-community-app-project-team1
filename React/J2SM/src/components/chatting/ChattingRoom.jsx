import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { SOCKET_URL } from "../../api/_http";
import axios from "axios";
import { API } from "../../api/_http";
import { useNavigate } from "react-router-dom";

const ChattingRoom = ({
  roomId = "비로그인",
  userId = "홍길동",
  nick = "회원",
}) => {
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [admins, setAdmins] = useState([]); // 관리자
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGrantListOpen, setIsGrantListOpen] = useState(false);

  const navigate = useNavigate();

  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);

  const itemStyles = {
    display: "block",
    width: "100%",
    padding: "8px 12px",
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
  };

  // 방 정보(이름, 참여자, 관리자) 조회
  useEffect(() => {
    axios
      .get(API.CHAT.ROOM_DETAIL(roomId))
      .then((res) => {
        setRoomName(res.data.name);
        setParticipants(res.data.participants);
        setAdmins(res.data.admins || []);
      })
      .catch(() => {
        setRoomName(roomId);
      });
  }, [roomId]);

  // 소켓 연결 및 메시지 구독
  useEffect(() => {
    const sock = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      setConnected(true);

      // 히스토리 수신
      client.subscribe("/user/queue/history", (frame) => {
        const history = JSON.parse(frame.body);
        setMessages(history);

        // 읽음 처리
        axios
          .post(API.CHAT.MARK_READ(roomId), null, { params: { userId } })
          .catch(console.error);
      });

      // 히스토리 요청
      client.publish({ destination: `/app/chat.history/${roomId}` });

      // 실시간 메시지 수신
      client.subscribe(`/topic/room/${roomId}`, (frame) => {
        const msg = JSON.parse(frame.body);
        setMessages((prev) => [...prev, msg]);
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId, userId]);

  // 스크롤 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 메시지 전송
  const sendMessage = () => {
    if (!connected || !input.trim()) return;
    const payload = { roomId, senderId: userId, text: input };
    clientRef.current.publish({
      destination: `/app/chat.sendMessage/${roomId}`,
      body: JSON.stringify(payload),
    });
    setInput("");
  };

  // 채팅방 이름 변경
  const handleRename = () => {
    const newName = window.prompt("새 채팅방 이름을 입력하세요", roomName);
    if (!newName || !newName.trim()) return;
    axios
      .put(API.CHAT.UPDATE_ROOM_NAME(roomId), null, {
        params: { name: newName.trim() },
      })
      .then((res) => {
        setRoomName(res.data.name);
        alert("채팅방 이름이 변경되었습니다.");
      })
      .catch((err) => {
        console.error(err);
        alert("이름 변경에 실패했습니다.");
      });
  };

  // 채팅방 나가기
  const handleLeave = async () => {
    // 본인 제외 참가자 목록을 구합니다.
    const others = participants.filter((p) => {
      const id = typeof p === "string" ? p : p.id;
      return id !== userId;
    });

    // 본인이 관리자이고, 다른 참가자가 있을 때만 권한 이양
    if (admins.includes(userId) && others.length > 0) {
      // 이름 혹은 ID 표시용 리스트 생성
      const displayList = others
        .map((p) => (typeof p === "string" ? p : p.name || p.id))
        .join("\n");

      const chosen = window
        .prompt(
          `관리자 권한을 넘길 사용자를 아래에서 선택하세요:\n${displayList}`
        )
        ?.trim();

      // 선택 유효성 검사
      const target = others.find((p) => {
        const name = typeof p === "string" ? p : p.name || p.id;
        return name === chosen;
      });
      if (!target) {
        alert("유효한 사용자 이름을 입력해주세요.");
        return;
      }

      const targetId = typeof target === "string" ? target : target.id;

      // 권한 이양 API 호출
      try {
        await axios.post(API.CHAT.GRANT_ADMIN(roomId), null, {
          params: { userId: targetId },
        });
        alert(`${chosen}님에게 관리자 권한을 이양했습니다.`);
      } catch (err) {
        console.error(err);
        alert("권한 이양에 실패했습니다. 떠나기를 취소합니다.");
        return;
      }
    }

    // 나가기 최종 확인
    if (!window.confirm("채팅방을 나가시겠습니까?")) return;

    // 나가기 API 호출
    axios
      .delete(API.CHAT.DELETE_ROOM(roomId), { params: { userId } })
      .then(() => navigate("/dashboard/chatting/main"))
      .catch(console.error);
  };

  // 특정 사용자에게 권한 부여
  const handleGrantTo = (targetId) => {
    axios
      .post(API.CHAT.GRANT_ADMIN(roomId), null, {
        params: { userId: targetId },
      })
      .then(() => {
        alert(`${targetId}님에게 관리자 권한을 부여했습니다.`);
      })
      .catch((err) => {
        console.error(err);
        alert("권한 부여에 실패했습니다.");
      });
  };

  return (
    <>
      <div className="topArea">
        <div className="Title">
          <h3>안녕하세요, {nick}님!</h3>
        </div>
      </div>

      <div className="chatContainer">
        <header
          className="chat-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="chat-title">채팅방: {roomName || roomId}</div>
          <div style={{ position: "relative" }}>
            <span
              className="chat-more-button"
              onClick={() => setIsMenuOpen((o) => !o)}
              style={{ cursor: "pointer" }}
            >
              더보기 ▾
            </span>
            {isMenuOpen && (
              <div
                className="chat-more-menu"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  zIndex: 10,
                }}
              >
                <button
                  className="chat-more-item"
                  onClick={handleLeave}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 12px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  채팅방 나가기
                </button>
                {admins.includes(userId) && (
                  <>
                    {/* 권한 부여 메뉴 토글 */}
                    <button
                      className="chat-more-item"
                      onClick={() => setIsGrantListOpen((o) => !o)}
                      style={itemStyles}
                    >
                      권한 부여 ▾
                    </button>
                    {/* 토글된 경우에만 참가자 리스트 노출 */}
                    {isGrantListOpen &&
                      participants
                        .filter((pid) => pid !== userId)
                        .map((pid) => (
                          <button
                            key={pid}
                            className="chat-more-item"
                            onClick={() => handleGrantTo(pid)}
                            style={itemStyles}
                          >
                            {pid}
                          </button>
                        ))}
                    <button
                      className="chat-more-item"
                      onClick={handleRename}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "8px 12px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      채팅방 이름 변경
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="chat-messages" id="messages">
          {messages.map((m, i) => {
            const isMine = m.senderId === userId;
            const unreadCount = participants.reduce((cnt, uid) => {
              if (uid === userId) return cnt;
              return cnt + (m.readBy?.includes(uid) ? 0 : 1);
            }, 0);

            return (
              <div
                key={i}
                className={`chat-message ${isMine ? "mine" : "other"}`}
              >
                <div
                  className="message-meta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span className="message-user">
                    {m.senderName ?? m.senderId}
                  </span>
                  <span className="message-time">
                    {new Date(m.timestamp).toLocaleTimeString()}
                  </span>
                  {unreadCount > 0 && (
                    <span className="message-unread" style={{ color: "red" }}>
                      ({unreadCount})
                    </span>
                  )}
                </div>
                <div className="message-content">{m.text}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} id="bottom-anchor" />
        </div>

        <div className="chat-input-area">
          <textarea
            className="chat-input"
            id="inputMessage"
            placeholder={connected ? "메시지를 입력하세요..." : "연결 중..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // 줄바꿈 방지
                sendMessage();
              }
            }}
            disabled={!connected}
          />
          <button
            className="chat-send-button"
            id="sendBtn"
            onClick={sendMessage}
            disabled={!connected || !input.trim()}
          >
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;

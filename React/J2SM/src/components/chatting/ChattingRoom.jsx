import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { SOCKET_URL } from "../../api/_http";
import axios from "axios";
import { API } from "../../api/_http";

const ChattingRoom = ({
  roomId = "비로그인",
  userId = "홍길동",
  nick = "회원",
}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [roomName, setRoomName] = useState("");
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 방 이름 조회
  useEffect(() => {
    console.log("방이름 조회");
    axios
      .get(API.CHAT.ROOM_DETAIL(roomId))
      .then((res) => setRoomName(res.data.name))
      .catch(() => setRoomName(roomId)); // 실패 시 ID로 폴백
  }, [roomId]);

  // 스크롤 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sock = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      setConnected(true);

      // 1) 유저별 히스토리 수신
      client.subscribe("/user/queue/history", (frame) => {
        const history = JSON.parse(frame.body);
        setMessages(history);

        // → 히스토리 불러온 직후 읽음 처리 REST 호출
        console.log("읽음 처리");
        console.log("roomId는 과연 " + roomId);
        axios
          .post(API.CHAT.MARK_READ(roomId), null, {
            params: { userId },
          })
          .catch(console.error);
      });

      // 2) 히스토리 요청
      client.publish({ destination: `/app/chat.history/${roomId}` });

      // 3) 실시간 메시지 수신
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
  }, [roomId]);

  // 스크롤 유지
  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (!connected || !input.trim()) return;
    const payload = { roomId, senderId: userId, text: input };
    clientRef.current.publish({
      destination: `/app/chat.sendMessage/${roomId}`,
      body: JSON.stringify(payload),
    });
    setInput("");
  };

  return (
    <>
      <div className="topArea">
        <div className="Title">
          <h3>채팅</h3>
        </div>
      </div>

      <div className="chatContainer">
        <header className="chat-header">
          <div className="chat-title">채팅방: {roomName || roomId}</div>
          <div className="chat-welcome">안녕하세요, {nick}님!</div>
        </header>

        <div className="chat-messages" id="messages">
          {messages.map((m, i) => {
            const isMine = m.senderId === userId;
            return (
              <div
                key={i}
                className={`chat-message ${isMine ? "mine" : "other"}`}
              >
                <div className="message-meta">
                  {/* senderName이 있으면 보여주고, 없으면 ID로 폴백 */}
                  <span className="message-user">
                    {m.senderName ?? m.senderId}
                  </span>
                  <span className="message-time">
                    {new Date(m.timestamp).toLocaleTimeString()}
                  </span>
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
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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

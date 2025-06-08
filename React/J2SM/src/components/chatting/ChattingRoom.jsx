import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { SOCKET_URL } from "../../api/_http";

const ChattingRoom = ({ roomId = "Room-1", userId = "홍길동" }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);

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
          <div className="chat-title">채팅방: {roomId}</div>
          <div className="chat-welcome">안녕하세요, {userId}님!</div>
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
                  <span className="message-user">{m.senderId}</span>
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

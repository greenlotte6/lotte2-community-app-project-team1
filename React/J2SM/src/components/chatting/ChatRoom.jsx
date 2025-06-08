import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function ChatRoom({ roomId = "123", userId = "user1" }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false); // ← 연결 플래그
  const clientRef = useRef(null);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws-chat");
    const client = new Client({
      webSocketFactory: () => sock,
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP]", str),
    });

    client.onConnect = () => {
      console.log("✅ STOMP Connected");
      setConnected(true); // ← 연결 완료!

      // ─── 1. 히스토리 구독 ─────────────────────────────
      // "/user/queue/history" 에 결과가 옴
      client.subscribe("/user/queue/history", (frame) => {
        const history = JSON.parse(frame.body);
        setMessages(history);
      });

      // ─── 2. 히스토리 요청 ─────────────────────────────
      client.publish({
        destination: `/app/chat.history/${roomId}`,
        body: "", // 바디는 없어도 pathVariable만으로 OK
      });

      client.subscribe(`/topic/room/${roomId}`, (frame) => {
        const msg = JSON.parse(frame.body);
        setMessages((prev) => [...prev, msg]);
      });
    };

    client.onStompError = (frame) => {
      console.error("❌ STOMP Error:", frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      console.log("🛑 STOMP Disconnected");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!connected) {
      console.warn("⚠️ 아직 STOMP 연결이 안 됐습니다!");
      return;
    }
    if (!input.trim()) return;
    const payload = { roomId, senderId: userId, text: input };
    clientRef.current.publish({
      destination: `/app/chat.sendMessage/${roomId}`,
      body: JSON.stringify(payload),
    });
    setInput("");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Chat Room: {roomId}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: 300,
          overflowY: "auto",
          padding: 8,
          marginBottom: 8,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <strong>[{m.senderId}]</strong> {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          style={{ flex: 1, padding: "4px 8px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          disabled={!connected}
        />
        <button
          onClick={sendMessage}
          style={{ marginLeft: 8 }}
          disabled={!connected || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

import React from "react";

const ChattingRoom = () => {
  return (
    <>
      <div class="topArea">
        <div class="Title">
          <h3>채팅</h3>
        </div>
      </div>

      <div class="chatContainer">
        <header class="chat-header">
          <div class="chat-title">채팅방: Room-1</div>
          <div class="chat-welcome">안녕하세요, 홍길동님!</div>
        </header>

        <div class="chat-messages" id="messages">
          <div class="chat-message other">
            <div class="message-meta">
              <span class="message-user">민수</span>
              <span class="message-time">10:01 AM</span>
            </div>
            <div class="message-content">안녕! 잘 지냈어?</div>
          </div>
          <div class="chat-message mine">
            <div class="message-meta">
              <span class="message-user">홍길동</span>
              <span class="message-time">10:02 AM</span>
            </div>
            <div class="message-content">응, 잘 지냈어~ 넌?</div>
          </div>

          <div id="bottom-anchor"></div>
        </div>

        <div class="chat-input-area">
          <textarea
            class="chat-input"
            id="inputMessage"
            placeholder="메시지를 입력하세요..."
          ></textarea>
          <button class="chat-send-button" id="sendBtn">
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;

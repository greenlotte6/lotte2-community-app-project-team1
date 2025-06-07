import React from "react";

const ChattingMain = () => {
  return (
    <>
      <div class="topArea">
        <div class="Title">
          <h3>채팅 카테고리</h3>
        </div>
        <div class="controlBar">
          <input
            type="text"
            id="searchCategory"
            placeholder="채팅방 검색..."
            class="searchInput"
          />
          <button id="createRoomBtn" class="createBtn">
            + 새 채팅방 만들기
          </button>
        </div>
      </div>

      <div class="categoryContainer">
        <a href="/view/Chatting/Chatting.html" class="categoryItem">
          <div class="itemLeft">
            <div class="itemTitle">일반 대화</div>
            <div class="itemDesc">자유롭게 소통하는 공간</div>
            <div class="lastMessage">[민수] 오늘 점심 뭐 드실래요?</div>
          </div>
          <div class="itemRight">
            <span class="unreadBadge">5</span>
            <div class="participants">
              <img src="/images/user.png" alt="member" />
              <img src="/images/user.png" alt="member" />
              <img src="/images/user.png" alt="member" />
            </div>
          </div>
        </a>

        <a href="/view/Chatting/Chatting.html" class="categoryItem">
          <div class="itemLeft">
            <div class="itemTitle">공지사항</div>
            <div class="itemDesc">회사 전반 공지 및 안내</div>
            <div class="lastMessage">[관리자] 이번 주 금요일 정기점검 안내</div>
          </div>
          <div class="itemRight">
            <span class="unreadBadge">0</span>
            <div class="participants">
              <img src="/images/user.png" alt="member" />
            </div>
          </div>
        </a>

        <a href="/view/Chatting/Chatting.html" class="categoryItem">
          <div class="itemLeft">
            <div class="itemTitle">프로젝트 A팀</div>
            <div class="itemDesc">A팀 개발 진행 상황 공유</div>
            <div class="lastMessage">[지영] 리뷰 요청 드려요.</div>
          </div>
          <div class="itemRight">
            <span class="unreadBadge">2</span>
            <div class="participants">
              <img src="/images/user.png" alt="member" />
              <img src="/images/user.png" alt="member" />
            </div>
          </div>
        </a>

        <a href="/view/Chatting/Chatting.html" class="categoryItem">
          <div class="itemLeft">
            <div class="itemTitle">IT 지원</div>
            <div class="itemDesc">개발/인프라 기술 지원</div>
            <div class="lastMessage">[민준] VPN 연결이 안 돼요.</div>
          </div>
          <div class="itemRight">
            <span class="unreadBadge">1</span>
            <div class="participants">
              <img src="/images/user.png" alt="member" />
              <img src="/images/user.png" alt="member" />
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default ChattingMain;

import React from "react";

const BoardView = () => {
  return (
    <>
      <div class="line"></div>
      <div class="contents-main">
        <div class="post-header">
          <div class="post-title">[공지사항] 사내 워크숍 일정 안내</div>
          <div class="post-meta">
            작성자: 홍길동 | 작성일: 2025.06.04 | 조회수: 45
          </div>
        </div>

        <div class="post-content">
          안녕하세요. <br />
          사내 워크숍 일정과 장소를 아래와 같이 안내드립니다.
          <br />
          <br />
          ● 일정: 2025년 6월 15일 ~ 16일
          <br />
          ● 장소: OO리조트
          <br />
          ● 준비물: 개인 세면도구, 필기도구 등<br />
          <br />
          많은 참여 부탁드립니다.
        </div>
        <div class="post-attachments">
          <h4>첨부파일</h4>
          <ul>
            <li>
              <a href="/uploads/workshop_info.pdf" download>
                워크숍 안내문.pdf
              </a>
            </li>
          </ul>
        </div>
        <form class="comment-form">
          <button class="memo-button" type="submit">
            삭제
          </button>
          <button class="memo-button" type="submit">
            수정
          </button>
        </form>

        <div class="comment-section">
          <h3>댓글</h3>
          <form class="comment-form">
            <textarea placeholder="댓글을 입력하세요..."></textarea>
            <button type="submit">등록</button>
          </form>
          <div class="comment-list">
            <div class="comment">
              <div class="comment-author">김철수</div>
              <div class="comment-content">좋은 일정 감사합니다!</div>

              <button class="comment-options-button">⋮</button>
              <div class="comment-options-menu">
                <button class="edit-comment">수정</button>
                <button class="delete-comment">삭제</button>
              </div>
            </div>
            <div class="comment">
              <div class="comment-author">안영희</div>
              <div class="comment-content">워크숍 기대가 됩니다~😍</div>

              <button class="comment-options-button">⋮</button>
              <div class="comment-options-menu">
                <button class="edit-comment">수정</button>
                <button class="delete-comment">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardView;

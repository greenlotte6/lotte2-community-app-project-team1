import React from "react";

const BoardView = () => {
  return (
    <>
      <div className="line"></div>
      <div className="contents-main">
        <div className="post-header">
          <div className="post-title">[공지사항] 사내 워크숍 일정 안내</div>
          <div className="post-meta">
            작성자: 홍길동 | 작성일: 2025.06.04 | 조회수: 45
          </div>
        </div>

        <div className="post-content">
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
        <div className="post-attachments">
          <h4>첨부파일</h4>
          <ul>
            <li>
              <a href="/uploads/workshop_info.pdf" download>
                워크숍 안내문.pdf
              </a>
            </li>
          </ul>
        </div>
        <form className="comment-form">
          <button className="memo-button" type="submit">
            삭제
          </button>
          <button className="memo-button" type="submit">
            수정
          </button>
        </form>

        <div className="comment-section">
          <h3>댓글</h3>
          <form className="comment-form">
            <textarea placeholder="댓글을 입력하세요..."></textarea>
            <button type="submit">등록</button>
          </form>
          <div className="comment-list">
            <div className="comment">
              <div className="comment-author">김철수</div>
              <div className="comment-content">좋은 일정 감사합니다!</div>

              <button className="comment-options-button">⋮</button>
              <div className="comment-options-menu">
                <button className="edit-comment">수정</button>
                <button className="delete-comment">삭제</button>
              </div>
            </div>
            <div className="comment">
              <div className="comment-author">안영희</div>
              <div className="comment-content">워크숍 기대가 됩니다~😍</div>

              <button className="comment-options-button">⋮</button>
              <div className="comment-options-menu">
                <button className="edit-comment">수정</button>
                <button className="delete-comment">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardView;

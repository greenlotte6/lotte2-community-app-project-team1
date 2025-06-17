import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BOARD } from "../../api/_http";

const WriteModal = ({ onClose, categoryId, writerUid }) => {
  const modalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 바깥 클릭 시 닫기
  const handleOutsideClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // 등록 버튼 동작
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    try {
      await axios.post(
        BOARD,
        {
          title,
          content,
          createdBy: writerUid,
          fixed: false,
          category: { id: categoryId },
          writer: { uid: writerUid },
        },
        {
          withCredentials: true, // 필요 시 쿠키 포함
        }
      );

      alert("게시글이 등록되었습니다.");
      onClose();
      window.location.reload(); // or 상태 업데이트
    } catch (error) {
      console.error("등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <div
      className="modal-overlay"
      ref={modalRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999,
      }}
    >
      <div className="modal-content">
        <div className="modal">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="modal-header">게시글 작성</div>
          <div className="modal-title">새 글쓰기</div>

          <div className="form-group">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group editor-toolbar">{/* 툴바 자리 */}</div>

          <div className="form-group">
            <div
              className="editor-area"
              contentEditable
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                minHeight: "120px",
                backgroundColor: "#fff",
              }}
            ></div>
          </div>
          <div className="form-group">
            <label>파일 첨부</label>
            <input type="file" />
          </div>

          <div className="modal-footer">
            <span className="next-button" onClick={handleSubmit}>
              등록
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;

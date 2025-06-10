import React, { useRef, useEffect } from "react";

const WriteModal = ({ onClose }) => {
  const modalRef = useRef(null);

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
            <input type="text" placeholder="제목을 입력하세요" />
          </div>

          <div className="form-group editor-toolbar">{/* 툴바 등 생략 */}</div>

          <div className="form-group">
            <div className="editor-area" contentEditable></div>
          </div>

          <div className="form-group">
            <label>파일 첨부</label>
            <input type="file" />
          </div>

          <div className="modal-footer">
            <span className="next-button">등록</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteModal;

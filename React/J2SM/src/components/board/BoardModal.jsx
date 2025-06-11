import React, { useState, useRef, useEffect } from "react";
import "../../styles/DashBoard/board.scss";

const BoardModal = ({ isOpen, onClose, onCreate }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target === modalRef.current) {
        onClose();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" ref={modalRef}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">새 게시판 만들기</div>
        <div className="modal-title">게시판 정보 입력</div>
        <div className="icon-circle">👩</div>
        <div className="form-group">
          <input id="newBoardName" type="text" placeholder="게시판 이름" />
        </div>
        <div className="form-group">
          <textarea placeholder="게시판 설명" />
        </div>
        <div className="modal-footer">
          <span className="next-button" onClick={onCreate}>
            만들기
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;

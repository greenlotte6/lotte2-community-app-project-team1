import React, { useState } from "react";
import BoardModal from "./BoardModal";

const BoardManager = () => {
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [lastDeletedIndex, setLastDeletedIndex] = useState(null);

  const handleCreateBoard = () => {
    const input = document.getElementById("newBoardName");
    const name = input.value.trim();
    if (!name) {
      alert("게시판 이름을 입력해주세요.");
      return;
    }

    const newBoard = {
      name,
      date: new Date().toISOString().slice(0, 10),
    };

    if (lastDeletedIndex !== null) {
      const updated = [...boards];
      updated.splice(lastDeletedIndex, 1, newBoard);
      setBoards(updated);
      setLastDeletedIndex(null);
    } else {
      setBoards([...boards, newBoard]);
    }

    setModalOpen(false);
    input.value = "";
  };

  const handleRemoveBoard = (index) => {
    if (window.confirm("해당 게시판을 삭제하시겠습니까?")) {
      const updated = [...boards];
      updated.splice(index, 1, null); // null로 placeholder 자리 남겨두기
      setBoards(updated);
      setLastDeletedIndex(index);
    }
  };

  const renderBoard = (board, index) => {
    if (!board) {
      return (
        <div key={index} className="board-left">
          <div
            className="add-new-board"
            onClick={() => {
              setLastDeletedIndex(index);
              setModalOpen(true);
            }}
          >
            <p>+ 자주쓰는 게시판 추가</p>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="board-left">
        <div className="board-main_1">
          <div className="board-top">
            <h3>{board.name}</h3>
            <a className="add_menu" onClick={() => handleRemoveBoard(index)}>
              🗑
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="title">새 글 예시</td>
                <td>관리자</td>
                <td>{board.date}</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
          <div className="pagination">
            <a href="#">MORE</a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="board-wrapper">
      {boards.map((board, index) => renderBoard(board, index))}
      <button onClick={() => setModalOpen(true)}>게시판 추가</button>

      <BoardModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
};

export default BoardManager;

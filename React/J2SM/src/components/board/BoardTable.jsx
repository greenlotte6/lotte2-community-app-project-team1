// src/components/board/BoardTable.jsx
import React from "react";

const BoardTable = ({ title, data, removable = false, onRemove }) => {
  return (
    <div className="board-main_1">
      <div className="board-top_1">
        <h3>{title}</h3>
        {removable && <a className="add_menu" onClick={onRemove}>🗑</a>}
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
          {data.map((item, idx) => (
            <tr key={idx}>
              <td className="title">{item.title}</td>
              <td>{item.author}</td>
              <td>{item.date}</td>
              <td>{item.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination"><a href="#">MORE</a></div>
    </div>
  );
};

export default BoardTable;

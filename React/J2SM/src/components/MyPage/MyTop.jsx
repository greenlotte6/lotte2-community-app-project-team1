import React from "react";

export const MyTop = () => {
  return (
    <div className="topArea">
      <div className="titleArea">
        <input type="text" placeholder="Title" />
      </div>
      <div className="favoriteshare">
        <img
          src="/images/star.png"
          alt="fav"
          style={{ width: "20px", height: "20px" }}
        />
        <p>공유하기</p>
      </div>
    </div>
  );
};

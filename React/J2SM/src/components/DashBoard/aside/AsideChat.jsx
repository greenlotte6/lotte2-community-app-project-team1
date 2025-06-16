import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { API } from "../../../api/_http";

const AsideChat = () => {
  const { username } = useAuth();
  const location = useLocation();

  const [personalRooms, setPersonalRooms] = useState([]);
  const [groupRooms, setGroupRooms] = useState([]);
  const [showPersonal, setShowPersonal] = useState(false);
  const [showGroup, setShowGroup] = useState(false);

  useEffect(() => {
    if (!username) return;

    axios
      .get(API.CHAT.ROOM_LIST(username))
      .then((res) => {
        const rooms = res.data;
        setPersonalRooms(rooms.filter((r) => r.description === "개인 채널"));
        setGroupRooms(rooms.filter((r) => r.description === "단체 채널"));
      })
      .catch(console.error);
  }, [username]);

  return (
    <aside>
      <div className="sidemenu">
        <div className="sideTop">
          <h3>Chatting</h3>
        </div>
        <div className="childArea">
          {/* 메인 */}
          <div className="menuItem">
            <img src="/images/File text.svg" alt="main" />
            <Link
              to="/dashboard/chatting/main"
              className={
                location.pathname === "/dashboard/chatting/main" ? "active" : ""
              }
            >
              Main
            </Link>
            <img src="/images/Vector.svg" alt="vector" />
          </div>

          {/* 개인 채널 */}
          <div
            className="menuItem"
            onClick={() => setShowPersonal((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            <img src="/images/File text.svg" alt="users" />
            <span id="asideChat">개인 채널</span>
            <span style={{ marginLeft: "auto" }}>
              {showPersonal ? "▼" : "▶"}
            </span>
          </div>
          {showPersonal && (
            <ul className="subMenu">
              {personalRooms.length > 0 ? (
                personalRooms.map((room) => (
                  <li key={room.id}>
                    <Link
                      to={`/dashboard/chatting/room/${room.id}`}
                      className={
                        location.pathname ===
                        `/dashboard/chatting/room/${room.id}`
                          ? "active"
                          : ""
                      }
                    >
                      {room.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ color: "#999", fontSize: "14px" }}>채널 없음</li>
              )}
            </ul>
          )}

          {/* 단체 채널 */}
          <div
            className="menuItem"
            onClick={() => setShowGroup((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            <img src="/images/File text.svg" alt="users" />
            <span id="asideChat">단체 채널</span>
            <span style={{ marginLeft: "auto" }}>{showGroup ? "▼" : "▶"}</span>
          </div>
          {showGroup && (
            <ul className="subMenu">
              {groupRooms.length > 0 ? (
                groupRooms.map((room) => (
                  <li key={room.id}>
                    <Link
                      to={`/dashboard/chatting/room/${room.id}`}
                      className={
                        location.pathname ===
                        `/dashboard/chatting/room/${room.id}`
                          ? "active"
                          : ""
                      }
                    >
                      {room.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li style={{ color: "#999", fontSize: "14px" }}>채널 없음</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AsideChat;

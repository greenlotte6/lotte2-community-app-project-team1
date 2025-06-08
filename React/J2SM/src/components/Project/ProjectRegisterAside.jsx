import React from "react";

export const ProjectRegisterAside = () => {
  return (
    <aside>
      <div class="sidemenu">
        <div class="sideTop">
          <h3>Project</h3>
        </div>
        <div class="childArea">
          <div class="menuItem">
            <img src="/images/File text.svg" alt="users" />
            <a href="#">진행중인 프로젝트</a>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          <ul class="subMenu">
            <li>
              <a href="#">더미더미더미</a>
            </li>
            <li>
              <a href="#">더미더미더미</a>
            </li>
          </ul>
          <div class="menuItem">
            <img src="/images/File text.svg" alt="users" />
            <a href="#">완료된 프로젝트</a>
            <img src="/images/Vector.svg" alt="vector" />
          </div>
          <ul class="subMenu">
            <li>
              <a href="#">더미더미더미</a>
            </li>
            <li>
              <a href="#">더미더미더미</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

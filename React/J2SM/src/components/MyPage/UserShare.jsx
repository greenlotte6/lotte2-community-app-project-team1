import React from "react";

// props: userGroups, selected, expandedDepartments, handleToggleDepartment, handleSelectUser, handleRemoveUser, channelType
export default function UserShare({
  userGroups = [],
  selected = [],
  expandedDepartments = {},
  handleToggleDepartment,
  handleSelectUser,
  handleRemoveUser,
  channelType = "group",
}) {
  return (
    <div className="user-selectors" id="userSelectors">
      <div className="available">
        <h3>초대 가능한 사용자</h3>
        {userGroups.map(
          (grp) =>
            grp.users.length > 0 && (
              <div key={grp.departmentName} className="department-group">
                {/* 부서명 클릭시 아코디언 */}
                <h4
                  onClick={() => handleToggleDepartment(grp.departmentName)}
                  style={{ cursor: "pointer" }}
                >
                  {grp.departmentName}
                  <span style={{ marginLeft: "10px" }}>
                    {expandedDepartments[grp.departmentName] ? "▼" : "▶"}
                  </span>
                </h4>
                {expandedDepartments[grp.departmentName] && (
                  <ul className="user-list">
                    {grp.users.map((u) => (
                      <li key={u.uid} className="user-item">
                        <span onClick={() => handleSelectUser(u)}>
                          {u.name}
                        </span>
                        <button onClick={() => handleSelectUser(u)}>+</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
        )}
      </div>
      <div className="selected">
        <h3>
          선택된 사용자 ({selected.length}
          {channelType === "private" ? "/1" : ""})
        </h3>
        <ul className="user-list">
          {selected.map((u) => (
            <li key={u.uid} className="user-item">
              <span>{u.name}</span>
              <button onClick={() => handleRemoveUser(u)}>×</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import React, { useRef, useEffect, useState } from "react";

export const EmployeeMid = () => {
  const modalRef = useRef(null);
  const tableRef = useRef(null);
  const [allData] = useState(
    [...Array(100)].map((_, i) => ({
      name: `정상수${i + 1}`,
      email: `email${i}@test.com`,
      phone: `010-0000-${i.toString().padStart(4, "0")}`,
      dept: "Backend",
      position: "Manager",
    }))
  );

  const rowsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allData.length / rowsPerPage);
  const [checkAll, setCheckAll] = useState(false);

  const pageData = allData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalRef.current) {
        modalRef.current.style.display = "none";
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = () => {
    if (modalRef.current) modalRef.current.style.display = "flex";
  };

  const closeModal = () => {
    if (modalRef.current) modalRef.current.style.display = "none";
  };

  // 휠 이벤트 감지
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;
      isScrolling = true;

      setTimeout(() => {
        isScrolling = false;
      }, 150);

      if (e.deltaY > 0) {
        if ((currentPage + 1) * rowsPerPage < allData.length) {
          setCurrentPage((prev) => prev + 1);
        }
      } else {
        if (currentPage > 0) {
          setCurrentPage((prev) => prev - 1);
        }
      }
    };

    const tableContainer = tableRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentPage, allData.length]);

  const toggleCheckAll = (e) => {
    setCheckAll(e.target.checked);
  };

  return (
    <div className="midArea">
      <div className="plusBtn">
        <div className="searchArea">
          <select>
            <option value="#">Select one</option>
            <option value="#">Name</option>
            <option value="#">Email</option>
            <option value="#">Phone</option>
            <option value="#">Department</option>
            <option value="#">Position</option>
          </select>
          <input type="text" placeholder="검색어 입력" />
          <button type="button">검색</button>
        </div>

        <button type="button" onClick={openModal}>
          <img src="/images/user-add.svg" alt="useradd" /> 사원 초대
        </button>

        <div
          className="modalOverlay"
          ref={modalRef}
          style={{ display: "none" }}
        >
          <div className="modalContent">
            <h3>사원 초대</h3>
            <input type="text" placeholder="회사명 입력" />
            <input type="text" placeholder="부서 입력" />
            <input type="text" placeholder="직책 입력" />
            <input type="text" placeholder="성명 입력" />
            <input type="text" placeholder="이메일 입력" />
            <div className="modalButtons">
              <button type="button" id="inviteConfirmBtn">
                초대
              </button>
              <button type="button" id="inviteCancelBtn" onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="listArea" id="tableContainer" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="checkAll"
                  checked={checkAll}
                  onChange={toggleCheckAll}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Department</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="checkbox"
                    className="rowCheckbox"
                    checked={checkAll}
                    readOnly
                  />
                </td>
                <td>
                  <div>
                    <img src="/images/user.png" alt="유저" />
                    <span>{row.name}</span>
                  </div>
                </td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>
                  <select>
                    <option>{row.dept}</option>
                    <option>{row.dept}</option>
                    <option>{row.dept}</option>
                  </select>
                </td>
                <td>
                  <select>
                    <option>{row.position}</option>
                    <option>{row.position}</option>
                    <option>{row.position}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bottomArea">
        <div className="btnArea">
          <div>
            <button className="deleteBtn">삭제하기</button>
          </div>
          <div className="pgbtn">
            <div className="pgArea">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`pg ${i === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(i)}
                ></button>
              ))}
            </div>
          </div>
          <div>
            <button className="modifyBtn">수정하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

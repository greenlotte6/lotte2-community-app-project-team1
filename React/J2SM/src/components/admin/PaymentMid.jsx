import React, { useEffect, useRef, useState } from "react";

export const PaymentMid = () => {
  // 샘플 데이터
  const allData = [...Array(100)].map((_, i) => ({
    day: "2025-05-29",
    method: "신용카드",
    amount: "34,900",
    rating: "Premium",
    status: "정상",
  }));

  const rowsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const tableRef = useRef(null);

  const totalPages = Math.ceil(allData.length / rowsPerPage);
  const pageData = allData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  // 휠로 페이지 이동
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

    const container = tableRef.current;
    if (container) container.addEventListener("wheel", handleWheel);

    return () => {
      if (container) container.removeEventListener("wheel", handleWheel);
    };
  }, [currentPage, allData.length]);

  return (
    <>
      <div className="midArea">
        <div className="listArea" id="tableContainer" ref={tableRef}>
          <table>
            <thead>
              <tr>
                <th>결제일</th>
                <th>결제수단</th>
                <th>결제 금액</th>
                <th>등급</th>
                <th>청구 상태</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, i) => (
                <tr key={i}>
                  <td>{row.day}</td>
                  <td>{row.method}</td>
                  <td>{row.amount}</td>
                  <td>{row.rating}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bottomArea">
        <div className="btnArea">
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
        </div>
      </div>
    </>
  );
};

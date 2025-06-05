import React, { useState, useRef, useEffect } from "react";

export const MembershipMid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // ESC 눌렀을 때 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="midArea">
      <div className="memberShipArea">
        {["Basic", "Standard", "Premium"].map((type, i) => (
          <div className="GetStarted" id={type.toLowerCase()} key={i}>
            <h3>{type}</h3>
            <p>{["소규모", "대부분", "대규모"][i]} 조직을 위한 플랜</p>
            <del>{["12,900", "24,900", "42,000"][i]}</del>
            <h4>{["9,900", "19,900", "34,900"][i]}</h4>
            <p>
              {type} - ₩{["9,900", "19,900", "34,900"][i]} /월
            </p>
            <button
              type="button"
              className="openInviteModalBtn"
              onClick={openModal}
            >
              Get Started
            </button>
            <div className="explanation">
              {/* 설명 리스트 생략 가능 */}
              <span>
                <img src="/images/Check.svg" alt="check" />
                플랜 기능 설명
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="modalOverlay"
          ref={modalRef}
          style={{ display: "flex" }}
        >
          <div className="modalContent">
            <h3 className="modalinfo">결제 정보</h3>
            <div className="inside">
              <div className="leftside">
                <select>
                  <option>VISA</option>
                  <option>PayPal</option>
                  <option>Master</option>
                </select>
                <div className="cardnum">
                  <h3>Card number</h3>
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
                <div className="cardnum">
                  <h3>Expriy date</h3>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="cardnum">
                  <h3>CVC</h3>
                  <input type="text" placeholder="CVC" />
                </div>
                <div className="cardnum">
                  <h3>Card password</h3>
                  <input type="text" placeholder="Password" />
                </div>
              </div>

              <div className="rightside">
                <span>Product Name</span>
                <h3>Standard 구매</h3>
                <span>Payment amount</span>
                <h3>₩ 9,900</h3>
              </div>
            </div>
            <div className="modalButtons">
              <button id="inviteConfirmBtn">결제</button>
              <button id="inviteCancelBtn" onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

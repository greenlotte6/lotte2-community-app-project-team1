import React from "react";

const AdminInfoRegister = () => {
  return (
    <div id="infoRegister">
      <div class="buy_form_1">
        <p class="h3">회사 및 대표 설정</p>
        <p class="texts">회사이름</p>
        <input type="text" name="companyName" class="input-default" />
        <p class="texts">대표이름</p>
        <input type="text" name="ceoName" class="input-default" />
        <p class="texts">전화번호</p>
        <input type="text" name="hp" class="input-default" />
        <p class="texts">프로필 이미지</p>
        <input type="file" name="file" class="input-default" />
        <div>
          <button class="btn">설정완료</button>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoRegister;

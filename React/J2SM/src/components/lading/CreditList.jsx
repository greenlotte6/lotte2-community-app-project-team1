import React from "react";
import { Link } from "react-router-dom";

const CreditList = () => {
  return (
    <div class="buy_form_1">
      <div class="main_1">
        <div class="sub_1">
          <h1 class="heading-underline">제품 및 가격안내</h1>
          <div class="check">
            <img src="/images/check.png" alt="line" />
          </div>
          <p class="desc-text">
            규모, 환경, 예산에 맞게 도입할 수 있는 다양한 유형의 제품을 합리적인
            가격으로 제공합니다.
          </p>
        </div>
        <div class="sub_2"></div>
        <div class="sub_3">
          <p class="artwork-text">Artwork에 세계를 체험해보세요.</p>
          <div class="pay-logos">
            <img src="/images/visa.png" alt="Visa" />
            <img src="/images/mastercard-logo.png" alt="Mastercard" />
            <img src="/images/amex.png" alt="American Express" />
            <img src="/images/paypal.png" alt="Paypal" />
            <img src="/images/bitcoin.png" alt="Bitcoin" />
            <img src="/images/ethereum.png" alt="Ethereum" />
          </div>
          <p class="eng-desc">
            We accept Visa, American Express, Mastercard, Paypal and Crypto
          </p>
        </div>
      </div>
      <div class="main_2">
        <div class="cards">
          <div class="card free">
            <div class="card text">
              <p class="title_F">Basic 요금제</p>
              <h3>소규모 팀을 위한 플랜</h3>
              <div class="price">9,900원</div>
              <h3>Basic – ₩9,900 /월</h3>
              <ul>
                <li>✔ 체험용 기본 기능 제공 (제한적)</li>
                <li>✔ 체험용 템플릿 2개</li>
                <li>✔ 드라이브 5GB 제공</li>
                <li style={{ color: "red" }}>X 커스터마이징 불가</li>
                <li style={{ color: "red" }}>X 제휴사 콘텐츠 사용 불가</li>
              </ul>
            </div>
            <div class="btn">
              <Link to="/credit/choice?type=Basic">결제 하기</Link>
            </div>
          </div>

          <div class="card month">
            <div class="card text">
              <p class="title_M">Standard 요금제</p>
              <h3>표준 비즈니스용 플랜</h3>
              <div class="price">19,900원</div>
              <h3>Standard – ₩19,900 /월</h3>
              <ul>
                <li>✔ 체험용 포함 전체 기능 제공</li>
                <li>✔ 템플릿 최대 10개</li>
                <li>✔ 드라이브 60GB</li>
                <li>✔ 제휴사 콘텐츠 일부 제공</li>
                <li>✔ 커스터마이징 가능</li>
              </ul>
            </div>
            <div class="btn">
              <Link to="/credit/choice?type=Standard">결제 하기</Link>
            </div>
          </div>

          <div class="card year">
            <div class="card text">
              <p class="title_Y">Premium 요금제</p>
              <h3>대규모 조직을 위한 플랜</h3>
              <div class="price">34,900원</div>
              <h3>Premium – ₩34,900 /월</h3>
              <ul>
                <li>✔ 전체 기능 제공</li>
                <li>✔ 템플릿 제한 없음</li>
                <li>✔ 드라이브 무제한 제공</li>
                <li>✔ 제휴 콘텐츠 전체 제공</li>
                <li>✔ 스튜디오 기능 무제한</li>
                <br />
              </ul>
            </div>
            <div class="btn" style={{ marginTop: "55px" }}>
              <Link to="/credit/choice?type=Premium">결제 하기</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditList;

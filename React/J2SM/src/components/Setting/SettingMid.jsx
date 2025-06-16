import React from "react";

export const SettingMid = () => {
  return (
    <div className="midArea">
      <section>
        <h4>PageSetting</h4>
        <div className="semi">
          <label>폰트 사이즈</label>
          <br />
          <input type="range" className="range" />
          <br />
        </div>
        <div className="semi">
          <label>언어 설정</label>
          <br />
          <select>
            <option>한국어</option>
            <option>영어</option>
          </select>
        </div>
      </section>

      <section>
        <h4>CalendarSetting</h4>
        <div className="semi">
          <label>알림 시간 설정</label>
          <br />
          <input type="time" />
          ~
          <input type="time" />
        </div>
      </section>

      <section>
        <h4>ChattingSetting</h4>
        <div className="semi">
          <label>알림 방식 설정</label>
          <br />
          <select>
            <option>이메일</option>
            <option>메세지</option>
            <option>페이지</option>
          </select>
        </div>
      </section>

      <section>
        <div className="semi">
          <h4>NoticeBoardSetting</h4>
          <p>추후에 추가 예정</p>
        </div>
      </section>

      <section>
        <h4>ProjectSetting</h4>
        <div className="semi">
          <label>프로젝트 알림</label>
          <br />
          <label className="toggle-switch">
            <span className="label-text">켜기/끄기</span>
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </section>

      <section>
        <h4>CloudSetting</h4>
        <div className="semi">
          <label>자동 백업 여부</label>
          <br />
          <label className="toggle-switch">
            <span className="label-text">켜기/끄기</span>
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <br />
        <div className="semi">
          <label>항상 알림 설정</label>
          <br />
          <label className="toggle-switch">
            <span className="label-text">켜기/끄기</span>
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <br />
        <div className="semi">
          <label className="custom-file-upload">
            기본 경로 설정
            <br />
            <input type="file" />
          </label>
        </div>
      </section>
    </div>
  );
};

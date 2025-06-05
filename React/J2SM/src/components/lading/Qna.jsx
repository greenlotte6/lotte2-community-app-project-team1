import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { postInquire } from "../../api/inquire";

const Qna = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    industry: "",
    name: "",
    email: "",
    memo: "",
    pass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const data = await postInquire(formData);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  };

  return (
    <div className="contact-container">
      <h3 className="contact-title">문의하기</h3>
      <p className="contact-subtitle">문의하실 내용을 입력해주세요.</p>

      <form onSubmit={submitHandler}>
        <div className="contact-form-box">
          <div>
            <p className="contact-label">회사 이름</p>
            <input
              type="text"
              name="company"
              onChange={handleChange}
              className="contact-input"
            />

            <p className="contact-label">업종</p>
            <input
              type="text"
              name="industry"
              onChange={handleChange}
              className="contact-input"
            />

            <div className="contact-row">
              <div>
                <p className="contact-label">이름</p>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>
              <div>
                <p className="contact-label">이메일</p>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="contact-input"
                />
              </div>
            </div>

            <p className="contact-label">임시 비밀번호</p>
            <input
              type="password"
              name="pass"
              onChange={handleChange}
              className="contact-input"
            />

            <p className="contact-label">문의사항</p>
            <textarea
              name="memo"
              onChange={handleChange}
              className="contact-textarea"
            ></textarea>

            <button type="submit" className="contact-button">
              문의 하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Qna;

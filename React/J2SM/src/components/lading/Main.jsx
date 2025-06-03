import React from "react";
import { useNavigate } from "react-router-dom";
import { Element } from "react-scroll";
import FeatureIntro from "../main/FeatureIntro";
import CreditList from "./CreditList";
import ImageList from "../main/ImageList";

export const Main = () => {
  const navigate = useNavigate();

  const credit = () => {
    navigate("/credit/list");
  };

  const creditChoice = () => {
    navigate("/credit/choice?type=free");
  };

  return (
    <>
      <section className="text-center py-20 px-4">
        <img className="Landing_logo" src="/images/logo.png" alt="메인 로고" />
        <div className="space-x-4">
          <button
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
            onClick={creditChoice}
          >
            무료 체험
          </button>
          <button
            className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
            onClick={credit}
          >
            결제하고 시작
          </button>
        </div>
      </section>

      <Element name="features">
        <FeatureIntro />
      </Element>

      <Element name="credits">
        <CreditList />
      </Element>

      <Element name="showImage">
        <ImageList />
      </Element>
    </>
  );
};

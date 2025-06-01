import React from "react";
import { useNavigate } from "react-router-dom";

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

      <section className="text-center px-6 pb-[100px]">
        <h2 className="text-3xl font-bold mb-6 margin-bottom py-10">
          J2SM 오피스 하나면 충분해요!
        </h2>

        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-10">
          <button className="px-5 py-2 rounded-full bg-white text-sm font-medium shadow">
            그룹웨어
          </button>
          <button className="px-5 py-2 rounded-full text-sm text-gray-500">
            캘린더
          </button>
          <button className="px-5 py-2 rounded-full text-sm text-gray-500">
            드라이브
          </button>
          <button className="px-5 py-2 rounded-full text-sm text-gray-500">
            채팅
          </button>
        </div>

        <div className="pb-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
                다양한 업무기능을 담은 그룹웨어
              </h3>
              <p className="text-gray-600 text-sm">
                회사의 체계적인 업무관리부터 협업까지
                <br /> 도와주는 포탈 서비스예요.
              </p>
              <a
                href="#"
                className="text-blue-600 text-sm mt-2 inline-block font-medium"
              >
                더보기 →
              </a>
            </div>
            <div className="bg-purple-50 p-6 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-purple-700 mb-2">
                캘린더
              </h3>
              <p className="text-gray-600 text-sm">
                일정을 공유하고 확인할 수 있는 스마트 캘린더 기능
              </p>
              <a
                href="#"
                className="text-purple-600 text-sm mt-2 inline-block font-medium"
              >
                자세히 보기 →
              </a>
            </div>
            <div className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-pink-700 mb-2">채팅</h3>
              <p className="text-gray-600 text-sm">
                실시간 채팅을 이용해 원활한 소통이 가능해요.
              </p>
              <a
                href="#"
                className="text-pink-600 text-sm mt-2 inline-block font-medium"
              >
                자세히 보기 →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

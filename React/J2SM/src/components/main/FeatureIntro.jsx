import React from "react";

const FeatureIntro = () => {
  return (
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
  );
};

export default FeatureIntro;

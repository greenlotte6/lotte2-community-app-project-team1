import { useLocation } from "react-router-dom";

// 개인/공용 캘린더 구분 커스텀 훅
const useCalendar = () => {
  const location = useLocation();

  // 현재 URL 경로에 'public'이 포함되어 있으면 공용 캘린더
  const cate = location.pathname.includes("public") ? "public" : "my";

  return [cate];
};

export default useCalendar;

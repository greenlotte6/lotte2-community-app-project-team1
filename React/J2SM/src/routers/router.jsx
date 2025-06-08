import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main/MainPage";
import { RegisterPage } from "../pages/user/RegisterPage";
import { lazy, Suspense } from "react";
import LoginPage from "../pages/user/LoginPage";
import FindPassPage from "../pages/user/FindPassPage";
import FindIdPage from "../pages/user/FindIdPage";
import CreditListPage from "../pages/lading/CreditListPage";
import CreditPage from "../pages/lading/CreditPage";
import CreditResultPage from "../pages/lading/CreditResultPage";
import AdminRegisterPage from "../pages/lading/AdminRegisterPage";
import EmailValidPage from "../pages/lading/EmailValidPage";
import AdminInfoRegisterPage from "../pages/lading/AdminInfoRegisterPage";
import FindIdResultPage from "../pages/user/FindIdResultPage";
import QnaPage from "../pages/lading/QnaPage";
import QnaViewPage from "../pages/lading/QnaViewPage";
import DashBoardPage from "../pages/DashBoard/DashBoardPage";
import AdminMainPage from "../pages/admin/AdminMainPage";
import AdminEmployeePage from "../pages/admin/AdminEmployeePage";
import AdminMembershipPage from "../pages/admin/AdminMembershipPage";
import AdminPaymentPage from "../pages/admin/AdminPaymentPage";
import CalendarPage from "../pages/Calendar/CalendarPage";
import ChattingMainPage from "../pages/chatting/ChattingMainPage";
import ChattingRoomPage from "../pages/chatting/ChattingRoomPage";
import ChatTestPage from "../pages/chatting/ChatTestPage";
import MyPage from "../pages/MyPage/MyPage";
import ProjectPage from "../pages/Project/ProjectPage";
import ProjectRegisterPage from "../pages/Project/ProjectRegisterPage";
import SettingPage from "../pages/Setting/SettingPage";

// 라우터 생성
const router = createBrowserRouter([
  /* 랜딩 라우터 시작 */
  // J2SM 이식중인 라우터
  { path: "/", element: <MainPage /> },

  // 결제 페이지
  { path: "/credit/list", element: <CreditListPage /> },
  { path: "/credit/choice", element: <CreditPage /> },
  { path: "/credit/result", element: <CreditResultPage /> },
  { path: "/credit/register", element: <AdminRegisterPage /> },
  { path: "/credit/email", element: <EmailValidPage /> },
  { path: "/credit/info", element: <AdminInfoRegisterPage /> },

  // 문의 페이지
  { path: "/qna", element: <QnaPage /> },
  { path: "/qna/view", element: <QnaViewPage /> },

  /* 랜딩 라우터 종료 */

  /* 유저 라우터 시작 */
  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/findpass", element: <FindPassPage /> },
  { path: "/user/findid", element: <FindIdPage /> },
  { path: "/user/findid/result", element: <FindIdResultPage /> },
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/logout", element: null },
  /* 유저 라우터 종료 */

  /* 대시보드 라우터 시작 */
  { path: "/dashboard/main", element: <DashBoardPage /> },
  /* 대시보드 라우터 종료 */

  /* 어드민 라우터 시작 */
  { path: "/admin/main", element: <AdminMainPage /> },
  { path: "/admin/employee", element: <AdminEmployeePage /> },
  { path: "/admin/membership", element: <AdminMembershipPage /> },
  { path: "/admin/adminpayment", element: <AdminPaymentPage /> },
  /* 어드민 라우터 종료 */

  /* 캘린더 */
  { path: "/dashboard/calendar", element: <CalendarPage /> },

  /* 채팅 */
  { path: "/dashboard/chatting/main", element: <ChattingMainPage /> },
  { path: "/dashboard/chatting/room", element: <ChattingRoomPage /> },
  { path: "/dashboard/chatting/test", element: <ChatTestPage /> },
  /*채팅 끝*/
  /* 채팅 라우터 종료 */

  /* 마이 페이지 라우터 시작 */
  { path: "/dashboard/mypage/mypage", element: <MyPage /> },
  /* 마이 페이지 라우터 종료 */

  /* 프로젝트 라우터 시작 */
  { path: "/dashboard/project/project", element: <ProjectPage /> },
  {
    path: "/dashboard/project/projectRegister",
    element: <ProjectRegisterPage />,
  },
  /* 프로젝트 라우터 종료 */

  /* 세팅 라우터 시작 */
  { path: "/dashboard/setting", element: <SettingPage /> },
  /* 세팅팅 라우터 종료 */
]);

// 라우터 내보내기
export default router;

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
import PublicCalendarPage from "../pages/Calendar/PublicCalendarPage";
import ChattingMainPage from "../pages/chatting/ChattingMainPage";
import ChattingRoomPage from "../pages/chatting/ChattingRoomPage";
import MyPage from "../pages/MyPage/MyPage";
import BoardMainPage from "../pages/Board/BoardMainPage";
import BoardListPage from "../pages/Board/BoardListPage";
import BoardViewPage from "../pages/Board/BoardViewPage";
import ProjectPage from "../pages/Project/ProjectPage";
import ProjectRegisterPage from "../pages/Project/ProjectRegisterPage";
import SettingPage from "../pages/Setting/SettingPage";
import DriveMainPage from "../pages/drive/DriveMainPage";
import RecentDrivePage from "../pages/drive/RecentDrivePage";
import DriveDeletePage from "../pages/drive/DriveDeletePage";
import { TempPage } from "../pages/user/TempPage";
import CreditSuccessPage from "../pages/lading/CreditSuccessPage";

// 라우터 생성
const router = createBrowserRouter([
  /* 랜딩 라우터 시작 */
  // J2SM 이식중인 라우터
  { path: "/", element: <MainPage /> },

  // 결제 페이지
  { path: "/credit/list", element: <CreditListPage /> },
  { path: "/pay/success", element: <CreditSuccessPage /> },
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
  { path: "/user/temp", element: <TempPage /> },
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

  /* 게시판 시작 */
  { path: "/dashboard/board/main", element: <BoardMainPage /> },
  { path: "/dashboard/board/list", element: <BoardListPage /> },
  { path: `/dashboard/board/list/:categoryId`, element: <BoardListPage /> },
  { path: "/dashboard/board/view", element: <BoardViewPage /> },
  { path: "/dashboard/board/view/:id", element: <BoardViewPage /> },

  /* 캘린더 */
  { path: "/dashboard/calendar", element: <CalendarPage /> },
  { path: "/dashboard/calendar/public", element: <CalendarPage /> },

  /* 채팅 */
  { path: "/dashboard/chatting/main", element: <ChattingMainPage /> },
  { path: "/dashboard/chatting/room/:roomId", element: <ChattingRoomPage /> },

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
  /* 세팅 라우터 종료 */

  /* 드라이브 라우터 */
  { path: "/dashboard/drive", element: <DriveMainPage /> },
  { path: "/dashboard/drive/recent", element: <RecentDrivePage /> },
  { path: "/dashboard/drive/delete", element: <DriveDeletePage /> },
]);

// 라우터 내보내기
export default router;

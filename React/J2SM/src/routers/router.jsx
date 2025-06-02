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

// 라우터 생성
const router = createBrowserRouter([
  // J2SM 이식중인 라우터
  { path: "/", element: <MainPage /> },

  // 결제 페이지
  { path: "/credit/list", element: <CreditListPage /> },
  { path: "/credit/choice", element: <CreditPage /> },
  { path: "/credit/result", element: <CreditResultPage /> },
  { path: "/credit/register", element: <AdminRegisterPage /> },
  { path: "/credit/email", element: <EmailValidPage /> },

  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/findpass", element: <FindPassPage /> },
  { path: "/user/findid", element: <FindIdPage /> },

  // 여기 밑은 팜스토리 라우터
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/logout", element: null },
]);

// 라우터 내보내기
export default router;

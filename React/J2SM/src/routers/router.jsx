import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/main/MainPage";
import { HelloPage } from "../pages/introduction/HelloPage";
import { DirectionPage } from "../pages/introduction/DirectionPage";
import { ListPage } from "../pages/market/ListPage";
import { LoginPage } from "../pages/user/LoginPage";
import { TermsPage } from "../pages/user/TermsPage";
import { RegisterPage } from "../pages/user/RegisterPage";
import { AdminMainPage } from "../pages/admin/AdminMainPage";
import { lazy, Suspense } from "react";

// prettier-ignore
const AdminProductRegisterPage = lazy(() =>  import("../pages/admin/product/RegisterPage"));
const BoardListPage = lazy(() => import("../pages/board/ListPage"));
const BoardWritePage = lazy(() => import("../pages/board/WritePage"));
const BoardViewPage = lazy(() => import("../pages/board/ViewPage"));
const BoardModifyPage = lazy(() => import("../pages/board/ModifyPage"));

// 라우터 생성
const router = createBrowserRouter([
  { path: "/user/login", element: <MainPage /> },

  { path: "/", element: <MainPage /> },

  { path: "/introduction/hello", element: <HelloPage /> },
  { path: "/introduction/direction", element: <DirectionPage /> },

  { path: "/market/list", element: <ListPage /> },

  { path: "/user/login", element: <LoginPage /> },
  { path: "/user/terms", element: <TermsPage /> },
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/logout", element: null },

  {
    path: "/board/list",
    element: (
      <Suspense>
        <BoardListPage />
      </Suspense>
    ),
  },
  {
    path: "/board/write",
    element: (
      <Suspense>
        <BoardWritePage />
      </Suspense>
    ),
  },
  {
    path: "/board/view",
    element: (
      <Suspense>
        <BoardViewPage />
      </Suspense>
    ),
  },
  {
    path: "/board/modify",
    element: (
      <Suspense>
        <BoardModifyPage />
      </Suspense>
    ),
  },

  { path: "/admin", element: <AdminMainPage /> },
  {
    path: "/admin/product/register",
    element: (
      <Suspense>
        <AdminProductRegisterPage />
      </Suspense>
    ),
  },
]);

// 라우터 내보내기
export default router;

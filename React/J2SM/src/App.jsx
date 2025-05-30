import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/App.scss";
import "./styles/Admin.scss";
import { MainLayout } from "./layouts/MainLayout";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

/*
npm add react-router-dom
npm install @reduxjs/toolkit react-redux
npm add axios
npm install js-cookie
npm install sass
*/

function App() {
  return <RouterProvider router={router} />;
}

export default App;

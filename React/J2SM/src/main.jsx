import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserValidProvider } from "./contexts/UserValidContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserValidProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </UserValidProvider>
  </AuthProvider>
);

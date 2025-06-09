import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Context에서 사용하는 상태값
  const [username, setUsername] = useState(null);
  const [department, setDepartment] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // 쿠키에서 username 가져오기
    const username = Cookies.get("username");
    const department = Cookies.get("department");
    const company = Cookies.get("company");

    // 쿠키값이 존재하면 Context username 초기화
    if (username) {
      setUsername(username);
    }

    if (department) {
      setDepartment(department);
    }

    if (company) {
      setCompany(company);
    }
  }, []);

  const login = (username, department, company) => {
    // Context username 초기화
    setUsername(username);
    setDepartment(department);
    setCompany(company);

    // 쿠키 저장
    Cookies.set("username", username);
    Cookies.set("department", department);
    Cookies.set("company", company);
  };

  const logout = () => {
    setUsername(null);
    Cookies.remove("username");
    Cookies.remove("department");
    Cookies.remove("company");
  };

  return (
    <AuthContext.Provider
      value={{ username, company, department, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

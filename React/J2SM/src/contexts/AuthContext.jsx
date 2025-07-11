import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Context에서 사용하는 상태값
  const [username, setUsername] = useState(null);
  const [department, setDepartment] = useState(null);
  const [company, setCompany] = useState(null);
  const [nick, setNick] = useState(null);
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    // 쿠키에서 username 가져오기
    const username = Cookies.get("username");
    const department = Cookies.get("department");
    const company = Cookies.get("company");
    const nick = Cookies.get("nick");
    const membership = Cookies.get("membership");

    // 쿠키값이 존재하면 Context username 초기화
    if (username) {
      setUsername(username);
    }

    if (nick) {
      setNick(nick);
    }

    if (department) {
      setDepartment(department);
    }

    if (company) {
      setCompany(company);
    }

    if (membership) {
      setMembership(membership);
    }
  }, []);

  const login = (username, department, company, nick, membership) => {
    // Context username 초기화
    setUsername(username);
    setDepartment(department);
    setCompany(company);
    setNick(nick);
    setMembership(membership);

    // 쿠키 저장
    Cookies.set("username", username);
    Cookies.set("department", department);
    Cookies.set("company", company);
    Cookies.set("nick", nick);
    Cookies.set("membership", membership);
  };

  const logout = () => {
    setUsername(null);
    Cookies.remove("username");
    Cookies.remove("department");
    Cookies.remove("company");
    Cookies.remove("nick");
    Cookies.remove("membership");
  };

  return (
    <AuthContext.Provider
      value={{ username, company, department, nick, login, logout, membership }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

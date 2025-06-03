import React, { createContext, useContext, useState } from "react";

// Context 생성
export const UserValidContext = createContext();

// Provider 컴포넌트 생성
export const UserValidProvider = ({ children }) => {
  const [hp, setHp] = useState("");

  return (
    <UserValidContext.Provider value={{ hp, setHp }}>
      {children}
    </UserValidContext.Provider>
  );
};

export const useUserValid = () => useContext(UserValidContext);

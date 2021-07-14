import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("@DevJobs:Token:User") || ""
  );
  const [userId, setUserId] = useState(localStorage.getItem("@DevJobs:User:Id") || "");

  useEffect(() => {
    if (userToken !== "") {
      const decoded = jwt_decode(userToken);
      const { sub } = decoded;
      localStorage.setItem("@DevJobs:User:Id", sub);
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    setUserToken("");
    setUserId("");
  };

  return (
    <TokenContext.Provider
      value={{ userToken, setUserToken, userId, handleLogout }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);

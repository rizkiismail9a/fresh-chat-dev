import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const value = useMemo(
    () => ({ authedUser, setAuthedUser }),
    [authedUser, setAuthedUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

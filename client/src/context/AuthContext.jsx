import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  // Use memo to avoid unwanted rerender
  /*
   * Since memo will only be triggered when the depedencies are changed
   */
  const value = useMemo(
    () => ({ authedUser, setAuthedUser }),
    [authedUser, setAuthedUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

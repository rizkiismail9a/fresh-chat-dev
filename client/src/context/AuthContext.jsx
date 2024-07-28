import Cookies from "js-cookie";
import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AuthenticationServices from "../services/auth.services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const clearStorage = () => {
    setAuthedUser({});
    localStorage.clear();
  };

  /*
   * Login again everytime user refresh the page
   */
  const refresh = async () => {
    try {
      if (authedUser._id) {
        const { data } = await AuthenticationServices.refresh(authedUser._id);
        Cookies.set("token", data.token, { expires: 1 });
      } else {
        clearStorage();
      }
    } catch (error) {
      console.error("error refresh", error);
      toast.error("The session is over");
      clearStorage();
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Use memo to avoid unwanted rerender
   * Since memo will only be triggered when the depedencies are changed
   */
  const value = useMemo(
    () => ({ authedUser, setAuthedUser }),
    [authedUser, setAuthedUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

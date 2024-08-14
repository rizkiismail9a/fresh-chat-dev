import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
  // tes pull
  return useContext(AuthContext);
};

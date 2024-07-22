import { API } from "../utils/api.utils";

const AuthenticationServices = {
  registerUser: (body) => {
    return API().post("/auth/signup", body);
  },
  logout: () => {
    return API().post("/auth/logout");
  },
  login: ({ username, password }) => {
    return API().post("/auth/login", { username, password });
  },
  refresh: (_id) => {
    return API().post("/auth/refresh", { _id });
  },
};

export default AuthenticationServices;

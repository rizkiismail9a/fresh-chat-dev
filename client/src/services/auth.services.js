import axios from "axios";
import Cookies from "js-cookie";

const API = ({ headers = {}, params = {} } = {}) => {
  const token = Cookies.get("token");
  const instanse = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    params,
  });

  return instanse;
};

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

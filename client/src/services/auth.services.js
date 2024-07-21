import axios from "axios";

const API = ({ headers = {}, params = {} } = {}) => {
  const instanse = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "/api",
    headers: {
      "Content-Type": "application/json",
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
};

export default AuthenticationServices;

import axios from "axios";
import Cookies from "js-cookie";

const API = ({ headers = {}, params = {} } = {}) => {
  const token = Cookies.get("token");
  const instanse = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    params,
  });

  return instanse;
};

export { API };

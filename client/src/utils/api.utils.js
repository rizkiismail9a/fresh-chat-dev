import axios from "axios";
import Cookies from "js-cookie";

const API = ({ headers = {}, params = {} } = {}) => {
  const token = Cookies.get("token");
  const instanse = axios.create({
    baseURL: "https://api.dev-fresh-chat.my.id/api",
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

import axios from "axios";

const API = ({ headers = {}, params = {} } = {}) => {
  // const token = Cookies.get("token");
  const instanse = axios.create({
    baseURL: "https://dev-fresh-chat.my.id/api",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      ...headers,
    },
    params,
  });

  return instanse;
};

export { API };

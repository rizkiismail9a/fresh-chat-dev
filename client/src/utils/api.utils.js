import axios from "axios";

const API = ({ headers = {}, params = {} } = {}) => {
  // const token = Cookies.get("token");
  const instanse = axios.create({
    baseURL: import.meta.env.VITE_BASE_URI + "/api",
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

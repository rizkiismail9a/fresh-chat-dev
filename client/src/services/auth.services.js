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

  /*
   * body includes
   * _id; id authed user, required
   * fullName; Not required
   * username; Not required
   *
   */
  updateProfile: (body) => {
    return API().put("/users/edit-user", body);
  },

  changePassword: ({
    oldPassword,
    newPassword,
    confirmNewPassword,
    userId,
  }) => {
    return API().put("/auth/change-password", {
      oldPassword,
      newPassword,
      confirmNewPassword,
      userId,
    });
  },
};

export default AuthenticationServices;

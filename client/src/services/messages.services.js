import { API } from "../utils/api.utils";

const MessagesServices = {
  getMessages: (id, params = {}) => {
    return API({ params }).get(`/messages/conversation/${id}`);
  },
  sendMessage: (recieverId, message) => {
    return API().post(`/messages/send/${recieverId}`, { message });
  },
};

export default MessagesServices;

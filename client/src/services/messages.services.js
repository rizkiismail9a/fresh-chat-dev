import { API } from "../utils/api.utils";

const MessagesServices = {
  getMessages: (id) => {
    return API().get(`/messages/conversation/${id}`);
  },
};

export default MessagesServices;

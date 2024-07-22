import { API } from "../utils/api.utils";

const ConversationsServices = {
  getConversations: () => {
    return API().get("/users/conversations");
  },
};

export default ConversationsServices;

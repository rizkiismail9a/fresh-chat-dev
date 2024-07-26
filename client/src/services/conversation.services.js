import { API } from "../utils/api.utils";

const ConversationsServices = {
  getConversationsData: (params = undefined) => {
    return API({ params }).get("/users/conversations");
  },
};

export default ConversationsServices;

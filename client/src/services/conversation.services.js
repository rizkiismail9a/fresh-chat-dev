import { API } from "../utils/api.utils";

const ConversationsServices = {
  getConversationsData: (params = undefined) => {
    console.log(params);
    return API({ params }).get("/users/conversations");
  },
};

export default ConversationsServices;

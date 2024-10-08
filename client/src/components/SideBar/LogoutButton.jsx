import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import AuthenticationServices from "../../services/auth.services";
import useConversationStore from "../../stores/conversation.store";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setAuthedUser } = useAuthContext();
  const { setSelectedConversation, setMessages } = useConversationStore();

  /*
   * To logout, it just needs to call the API service of logout here
   * Then, remove the localStorage
   */
  const logout = async () => {
    try {
      await AuthenticationServices.logout();
      navigate("/login");
      setAuthedUser({});
      setMessages([]);
      setSelectedConversation(null);
      sessionStorage.clear();
      localStorage.clear();
      Cookies.clear();
    } catch (error) {
      console.error("logout error", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <button onClick={logout}>
      <BiLogOut className="text-white h-6 w-6 cursor-pointer" />
    </button>
  );
};

export default LogoutButton;

import toast from "react-hot-toast";
import { useAuthContext } from "../context/auth.context";
import AuthenticationServices from "../services/auth.services";
import useConversationStore from "../stores/conversation.store";

const useUpdatePassword = () => {
  const { setLoading } = useConversationStore();
  const { authedUser } = useAuthContext();
  const changePassword = async ({
    newPassword,
    oldPassword,
    confirmNewPassword,
  }) => {
    try {
      setLoading(true);
      const { data } = await AuthenticationServices.changePassword({
        newPassword,
        oldPassword,
        confirmNewPassword,
        userId: authedUser._id,
      });

      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { changePassword };
};

export default useUpdatePassword;

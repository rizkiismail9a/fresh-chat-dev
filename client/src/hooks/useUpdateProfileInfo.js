import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/auth.context";
import AuthenticationServices from "../services/auth.services";

const useUpdateProfileInfo = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthedUser, authedUser } = useAuthContext();
  const updateProfile = async (body) => {
    try {
      setLoading(true);
      const { data } = await AuthenticationServices.updateProfile(body);
      const { _id, fullName, username, profileImg, gender } = data.data;

      setAuthedUser({
        ...authedUser,
        _id,
        fullName,
        username,
        profileImg,
        gender,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...authedUser,
          _id,
          fullName,
          username,
          profileImg,
          gender,
        })
      );

      toast.success(data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProfile };
};

export default useUpdateProfileInfo;

import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/auth.context";
import AuthenticationServices from "../services/auth.services";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthedUser } = useAuthContext();

  const register = async ({
    fullName,
    username,
    gender,
    password,
    confirmPassword,
  }) => {
    try {
      setLoading(true);

      const isValid = validateForm({
        fullName,
        username,
        gender,
        password,
        confirmPassword,
      });

      if (!isValid) return;

      const { data } = await AuthenticationServices.registerUser({
        fullName,
        username,
        gender,
        password,
        confirmPass: confirmPassword,
      });

      setAuthedUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      Cookies.set("token", data.data.token, { expires: 1 });
      toast.success("Sign Up Success");
    } catch (error) {
      console.error("error register", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

const validateForm = ({
  fullName,
  username,
  gender,
  password,
  confirmPassword,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
};

export default useSignUp;

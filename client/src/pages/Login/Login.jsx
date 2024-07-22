import { useRef } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import AuthenticationServices from "../../services/auth.services";

const Login = () => {
  const { setAuthedUser } = useAuthContext();
  const username = useRef("");
  const password = useRef("");

  /*
   * Login function run when user click login button
   * after that, user data will saved in localstorage and the global state will be updated
   *
   */

  const login = async (e) => {
    try {
      e.preventDefault();
      const { data } = await AuthenticationServices.login({
        username: username.current.value,
        password: password.current.value,
      });
      setAuthedUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success("Login success");
    } catch (error) {
      console.error("login error", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      data-section="login-wrapper"
      className="flex flex-col gap-8 p-4 min-w-96 rounded-lg leading-normal"
    >
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Login <span className="text-blue-400">Fresh Chat</span>
      </h1>

      <form onSubmit={login} className="flex flex-col gap-1">
        <div>
          <label className="label">
            <span className="text-base label-text text-gray-100">Username</span>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="input bg-white-0 glass h-10 text-white"
              required
              ref={username}
            />
          </label>
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text text-gray-100">Password</span>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="input bg-white-0 glass h-10 text-white"
              required
              ref={password}
            />
          </label>
        </div>
        <div>
          <Link
            to="/signup"
            className="text-xs text-gray-100 hover:underline hover:text-blue-600 mx-auto"
          >
            {"Don't"} have any account? Just sign up
          </Link>
        </div>

        <button className="btn btn-block btn-md">Login</button>
      </form>
    </div>
  );
};

export default Login;

import Cookies from "js-cookie";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import AuthenticationServices from "../../services/auth.services";
import useConversationStore from "../../stores/conversation.store";

const Login = () => {
  const { setAuthedUser } = useAuthContext();
  const username = useRef("");
  const { setLoading } = useConversationStore();
  const password = useRef("");

  /*
   * Login function run when user click login button
   * after that, user data will saved in localstorage and the global state will be updated
   *
   */

  const login = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await AuthenticationServices.login({
        username: username.current.value,
        password: password.current.value,
      });
      setAuthedUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
      Cookies.set("token", data.data.token, { expires: 1 });
      toast.success("Login success");
    } catch (error) {
      console.error("login error", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Login to Fresh Chat app" />
        <meta name="keywords" content="chatting, chatting app" />
        <meta name="author" content="Yuri Ostrovsky" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Fresh Chat Dev" />
        <meta
          property="og:description"
          content="Chatting app with React js and socket IO and mongo DB"
        />
        <meta
          property="og:image"
          content="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        />
        <title>Login - Fresh Chat Dev</title>
      </Helmet>

      <div
        data-section="login-wrapper"
        className="flex flex-col gap-8 p-4 !w-full tablet:w-96 rounded-lg leading-normal"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-50">
          Login <span className="text-blue-400">Fresh Chat</span>
        </h1>

        <form onSubmit={login} className="flex flex-col gap-1">
          <label className="label gap-2">
            <span className="text-base label-text text-gray-100">Username</span>
            <input
              type="text"
              id="username"
              autoComplete="off"
              placeholder="Enter username"
              className="input bg-white-0 glass h-10 text-white w-full"
              required
              ref={username}
            />
          </label>

          <label className="label gap-2">
            <span className="text-base label-text text-gray-100">Password</span>
            <input
              type="password"
              id="password"
              autoComplete="off"
              placeholder="Enter password"
              className="input bg-white-0 glass h-10 text-white w-full"
              required
              ref={password}
            />
          </label>

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
    </>
  );
};

export default Login;

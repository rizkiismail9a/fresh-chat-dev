import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      data-section="login-wrapper"
      className="flex flex-col gap-8 p-4 min-w-96 rounded-lg leading-normal"
    >
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Login <span className="text-blue-400">Fresh Chat</span>
      </h1>

      <form className="flex flex-col gap-1">
        <div>
          <label className="label">
            <span className="text-base label-text text-gray-100">Username</span>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="input bg-white-0 glass h-10 text-white"
              required
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

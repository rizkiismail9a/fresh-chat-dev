const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        data-section="login-wrapper"
        className="flex flex-col gap-8 w-full p-6 rounded-lg bg-red-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 leading-normal"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-400">Fresh Chat</span>
        </h1>

        <form className="flex flex-col gap-1">
          <div>
            <label className="label">
              <span className="text-base label-text text-gray-100">
                Username
              </span>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                className="input bg-white-0 glass h-10 text-white"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-gray-100">
                Password
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                className="input bg-white-0 glass h-10 text-white"
              />
            </label>
          </div>
          <div>
            <a
              href="/"
              className="text-xs text-gray-100 hover:underline hover:text-blue-600 mx-auto"
            >
              {"Don't"} have any account? Just sign up
            </a>
          </div>

          <button className="btn btn-block btn-md">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

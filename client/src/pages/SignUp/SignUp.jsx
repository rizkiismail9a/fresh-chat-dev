import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div
      data-section="signup-wrapper"
      className="flex flex-col gap-8 p-4 w-full rounded-lg min-w-[28rem] leading-normal"
    >
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Sign Up <span className="text-blue-400">Fresh Chat</span>
      </h1>

      <form className="flex flex-col gap-1">
        <div>
          <label className="label">
            <span className="text-base label-text text-gray-100">
              Full Name
            </span>
            <input
              type="text"
              id="fullName"
              placeholder="Enter fullname"
              className="input bg-white-0 glass h-10 text-white"
            />
          </label>
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text text-gray-100">Username</span>
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
            <span className="text-base label-text text-gray-100">Password</span>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="input bg-white-0 glass h-10 text-white"
            />
          </label>
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text text-gray-100">
              Confirm Password
            </span>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter password confirmation"
              className="input bg-white-0 glass h-10 text-white"
            />
          </label>
        </div>
        <GenderCheckbox />
        <div>
          <Link
            to="/login"
            className="text-xs text-gray-100 hover:underline hover:text-blue-600 mx-auto"
          >
            Already have an account? Login
          </Link>
        </div>
        <button className="btn btn-block btn-md">Sign Up</button>
      </form>
    </div>
    // <div className="flex flex-col items-center justify-center min-w-[28rem] mx-auto">
    // </div>
  );
};

export default SignUp;

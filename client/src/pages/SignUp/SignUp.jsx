import { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignup";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  const { register } = useSignUp();

  const [signUpData, setSignUpData] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [errorMsgVisibility, setErrorMsgVisibility] = useState(false);

  const submitData = async (e) => {
    e.preventDefault();
    if (signUpData.gender === "") {
      setErrorMsgVisibility(true);
    }
    await register(signUpData);
  };

  // Handle checkbox changes
  const handleChange = (e) => {
    setErrorMsgVisibility(false);
    setSignUpData(() => ({ ...signUpData, gender: e }));
  };

  return (
    <div
      data-section="signup-wrapper"
      className="flex flex-col gap-8 p-4 w-full rounded-lg min-w-[28rem] leading-normal"
    >
      <h1 className="text-3xl font-semibold text-center text-gray-300">
        Sign Up <span className="text-blue-400">Fresh Chat</span>
      </h1>

      <form onSubmit={submitData} className="flex flex-col gap-1">
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
              required
              value={signUpData.fullName}
              onChange={(e) =>
                setSignUpData({ ...signUpData, fullName: e.target.value })
              }
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
              required
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
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
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
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
              required
              value={signUpData.confirmPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </label>
        </div>
        <GenderCheckbox
          onChange={handleChange}
          selectedValue={signUpData.gender}
        />
        {errorMsgVisibility && (
          <p className="text-red-600 text-sm">Please, select a gender</p>
        )}
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

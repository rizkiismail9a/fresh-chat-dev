import { useState } from "react";
import { Helmet } from "react-helmet";
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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Regiter new account for Fresh Chat app"
        />
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
        <title>Register - Fresh Chat Dev</title>
      </Helmet>
      <div
        data-section="signup-wrapper"
        className="flex flex-col gap-8 p-4 rounded-lg tablet:min-w-[28rem] leading-normal"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-50">
          Sign Up <span className="text-blue-400">Fresh Chat</span>
        </h1>

        <form onSubmit={submitData} className="flex flex-col gap-1">
          <label className="label gap-2">
            <span className="text-base label-text text-gray-100 w-[50%]">
              Full Name
            </span>
            <input
              type="text"
              id="fullName"
              placeholder="Enter fullname"
              className="input bg-white-0 glass h-10 text-white w-full"
              required
              value={signUpData.fullName}
              autoComplete="off"
              onChange={(e) =>
                setSignUpData({ ...signUpData, fullName: e.target.value })
              }
            />
          </label>

          <label className="label gap-2">
            <span className="text-base label-text text-gray-100 w-[50%]">
              Username
            </span>
            <input
              type="text"
              id="username"
              autoComplete="off"
              placeholder="Enter username"
              className="input bg-white-0 glass h-10 text-white w-full"
              required
              value={signUpData.username}
              onChange={(e) =>
                setSignUpData({ ...signUpData, username: e.target.value })
              }
            />
          </label>

          <label className="label gap-2">
            <span className="text-base label-text text-gray-100 w-[50%]">
              Password
            </span>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="input bg-white-0 glass h-10 text-white w-full"
              required
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
          </label>

          <label className="label gap-2">
            <span className="text-base label-text text-gray-100 w-[50%]">
              Confirm Password
            </span>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Enter password confirmation"
              className="input bg-white-0 glass h-10 text-white w-full"
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
    </>
  );
};

export default SignUp;

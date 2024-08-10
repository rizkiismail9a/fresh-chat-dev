import { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import useUpdateProfileInfo from "../../hooks/useUpdateProfileInfo";
import GenderCheckbox from "../../pages/SignUp/GenderCheckbox";
import useConversationStore from "../../stores/conversation.store";
import {
  findInputErrors,
  isFormInvalid,
} from "../../utils/findInputError.utils";
import Dialog from "../Dialog/Dialog";

const NavBar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setShowSidebar, showSidebar } = useConversationStore();
  const { authedUser } = useAuthContext();
  const imgSrc = authedUser.gender === "male" ? "/boy.webp" : "girl.webp";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <UpdateUserDialog
        imgSrc={imgSrc}
        onClose={() => setIsDialogOpen(false)}
        visibility={isDialogOpen}
      />
      <div className="h-[60px] bg-clip-padding backdrop-filter tablet:w-[1000px] w-[90%] overflow-hidden rounded-lg backdrop-blur-sm bg-opacity-0 shadow-lg flex items-center px-4">
        <div className="flex justify-between items-center w-full">
          {pathname === "/chat" && (
            <IoMdArrowRoundBack
              className="h-6 w-6 text-gray-50 cursor-pointer tablet:hidden block"
              onClick={() => navigate("/chats")}
            />
          )}

          {pathname === "/home" && (
            <TbLayoutSidebarRightCollapse
              className="h-6 w-6 text-gray-50 cursor-pointer tablet:block hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          )}
          <div className="flex flex-1 justify-end items-center gap-4">
            <p className="text-gray-50 font-semibold text-md p-0">
              {authedUser.fullName}
            </p>
            <img
              src={imgSrc}
              alt="profile placeholder"
              className="h-10 w-10 object-cover cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const UpdateUserDialog = ({ imgSrc, onClose, visibility }) => {
  const { authedUser } = useAuthContext();
  const methods = useForm();
  const [showInputName, setShowInputName] = useState(false);
  const [showInputUsername, setShowInputUsername] = useState(false);
  const [showInputGender, setShowInputGender] = useState(false);
  const { updateProfile } = useUpdateProfileInfo();
  const [gender, setGender] = useState(authedUser.gender);
  const formValidator = {
    required: {
      value: true,
      message: "This field can not be empty",
    },
  };

  /*
   * submit the form
   */
  const submitData = methods.handleSubmit((dataFrom) => {
    const checkData = (data) => {
      Object.keys(data).forEach((item) => {
        if (!data[item].length) {
          delete data[item];
        }
      });

      return data;
    };
    updateProfile(checkData({ ...dataFrom, userId: authedUser._id, gender }));
  });

  return (
    <Dialog onClose={onClose} visibility={visibility}>
      <div className="flex flex-col gap-4">
        <h2 className="text-white">Profile User</h2>
        <img
          src={imgSrc}
          alt="profile placeholder"
          className="h-20 w-20 object-cover"
        />
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <div className="flex flex-col gap-1">
              <UpdateInput
                showInput={showInputName}
                onOpen={(e) => setShowInputName(e)}
                label="Full Name"
                value={authedUser.fullName}
                inputName="fullName"
                validation={formValidator}
              />
              <UpdateInput
                showInput={showInputUsername}
                onOpen={(e) => setShowInputUsername(e)}
                label="Username"
                inputName="username"
                value={authedUser.username}
                validation={formValidator}
              />
              <CheckBoxInput
                showInput={showInputGender}
                onOpen={(e) => setShowInputGender(e)}
                label="Gender"
                value={authedUser.gender}
                onSelectGender={(e) => setGender(e)}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-white cursor-pointer hover:underline">
                Change Password
              </p>
              <button
                className="btn btn-outline w-20"
                disabled={
                  !showInputGender && !showInputName && !showInputUsername
                }
                onClick={submitData}
              >
                Save
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Dialog>
  );
};

const UpdateInput = ({
  showInput,
  onOpen,
  label,
  value,
  inputName,
  validation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputError = findInputErrors(errors, inputName);
  const isInvalid = isFormInvalid(inputError);

  const setInputVisibility = (isOpen) => {
    onOpen(isOpen);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <div className="text-gray-200 w-20">{label}</div>
        <div className="text-white">:</div>
        {!showInput && <div className="text-white flex-1">{value}</div>}
        {!showInput && (
          <FaPen
            onClick={() => setInputVisibility(true)}
            className="text-white text-sm cursor-pointer"
          />
        )}
        {showInput && (
          <label className="label gap-2 flex-1">
            <input
              type="text"
              id="username"
              autoComplete="off"
              defaultValue={value}
              placeholder="Enter username"
              className="input bg-white-0 glass h-8 text-white w-full"
              {...register(inputName, validation)}
            />
          </label>
        )}
        {showInput && (
          <IoCloseSharp
            className="text-white text-sm cursor-pointer"
            onClick={() => setInputVisibility(false)}
          />
        )}
      </div>
      {isInvalid && showInput && (
        <div className="text-red-600 self-end text-sm">
          {inputError.error.message}
        </div>
      )}
    </div>
  );
};

const CheckBoxInput = ({ showInput, onOpen, label, value, onSelectGender }) => {
  const [gender, setGender] = useState(value);

  const setInputVisibility = (isOpen) => {
    onOpen(isOpen);
  };

  const handleChange = (e) => {
    setGender(e);
    onSelectGender(e);
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <div className="text-gray-200 w-20">{label}</div>
        <div className="text-white">:</div>
        {!showInput && (
          <div className="text-white flex-1">
            {value === "male" ? "Male" : "Female"}
          </div>
        )}
        {!showInput && (
          <FaPen
            onClick={() => setInputVisibility(true)}
            className="text-white text-sm cursor-pointer"
          />
        )}
        {showInput && (
          <div className="flex-1">
            <GenderCheckbox onChange={handleChange} selectedValue={gender} />
          </div>
        )}
        {showInput && (
          <IoCloseSharp
            className="text-white text-sm cursor-pointer"
            onClick={() => setInputVisibility(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;

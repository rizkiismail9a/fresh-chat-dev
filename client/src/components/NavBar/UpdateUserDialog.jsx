import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useAuthContext } from "../../context/auth.context";
import useUpdateProfileInfo from "../../hooks/useUpdateProfileInfo";
import GenderCheckbox from "../../pages/SignUp/GenderCheckbox";
import Dialog from "../Dialog/Dialog";
import UpdateInput from "./UpdateInput";
import UpdatePasswordDialog from "./UpdatePasswordDialog";

const UpdateUserDialog = ({ imgSrc, onClose, visibility }) => {
  const { authedUser } = useAuthContext();
  const methods = useForm();
  const [showInputName, setShowInputName] = useState(false);
  const [showInputUsername, setShowInputUsername] = useState(false);
  const [showInputGender, setShowInputGender] = useState(false);
  const { updateProfile } = useUpdateProfileInfo();
  const [gender, setGender] = useState(authedUser.gender);
  const [showChangePass, setShowChangePass] = useState(false);
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
    <>
      <Dialog onClose={onClose} visibility={visibility}>
        <div className="flex flex-col gap-4 w-[400px]">
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
                  placeholder="Input new full name"
                  value={authedUser.fullName}
                  inputName="fullName"
                  validation={formValidator}
                />
                <UpdateInput
                  showInput={showInputUsername}
                  onOpen={(e) => setShowInputUsername(e)}
                  label="Username"
                  placeholder="Input new username"
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
                <p
                  onClick={() => setShowChangePass(true)}
                  className="text-sm text-white cursor-pointer hover:underline"
                >
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
      {/* Place in the bottom, so it will be showed above update dialog */}
      <UpdatePasswordDialog
        visibility={showChangePass}
        handleClose={() => setShowChangePass(false)}
      />
    </>
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

export default UpdateUserDialog;

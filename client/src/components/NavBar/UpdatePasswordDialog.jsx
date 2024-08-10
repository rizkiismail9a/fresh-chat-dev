import { FormProvider, useForm } from "react-hook-form";
import useUpdatePassword from "../../hooks/useUpdatePassword";
import Dialog from "../Dialog/Dialog";
import UpdateInput from "./UpdateInput";

const UpdatePasswordDialog = ({ handleClose, visibility }) => {
  const methods = useForm();
  const { changePassword } = useUpdatePassword();

  const submitData = methods.handleSubmit(
    ({ newPassword, oldPassword, confirmNewPassword }) => {
      if (newPassword !== confirmNewPassword) {
        methods.setError("confirmNewPassword", {
          type: "custom",
          message: "Confirm Password does not match",
        });

        return;
      }
      changePassword({ newPassword, oldPassword, confirmNewPassword });
      methods.reset();
    }
  );

  const closeDialog = () => {
    handleClose();
    methods.reset();
  };

  return (
    <Dialog onClose={closeDialog} visibility={visibility} width="900px">
      <div className="flex flex-col gap-4 tablet:w-[600px] min-w-[300px]">
        <h2 className="text-white">Change Password</h2>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <UpdateInput
              showInput
              showVisibilityButton={false}
              label="Old Password"
              inputName="oldPassword"
              inputType="password"
              placeholder="Input old password"
              value=""
              validation={{
                required: {
                  value: true,
                  message: "This field can not be empty",
                },
              }}
            />
            <UpdateInput
              showInput
              showVisibilityButton={false}
              label="New Password"
              inputName="newPassword"
              inputType="password"
              placeholder="Input new password"
              value=""
              validation={{
                required: {
                  value: true,
                  message: "This field can not be empty",
                },
              }}
            />
            <UpdateInput
              showInput
              showVisibilityButton={false}
              label="Confirm New Password"
              inputName="confirmNewPassword"
              inputType="password"
              placeholder="Confirm new password"
              value=""
              validation={{
                required: {
                  value: true,
                  message: "This field can not be empty",
                },
              }}
            />

            <button
              className="btn btn-outline w-20 self-end"
              onClick={submitData}
            >
              Save
            </button>
          </form>
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default UpdatePasswordDialog;

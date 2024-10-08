import { useFormContext } from "react-hook-form";
import { FaPen } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import {
  findInputErrors,
  isFormInvalid,
} from "../../utils/findInputError.utils";

/*
 * showInput is needed to hide or show the save button
 * onOpen in case need to do something when hide or open the input form
 *
 */

const UpdateInput = ({
  showInput,
  showVisibilityButton = true,
  onOpen,
  label,
  value,
  inputName,
  validation,
  inputType,
  placeholder,
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
        <div className="text-gray-200 min-w-20">{label}</div>
        <div className="text-white">:</div>
        {!showInput && <div className="text-white flex-1">{value}</div>}
        {!showInput && showVisibilityButton && (
          <FaPen
            onClick={() => setInputVisibility(true)}
            className="text-white text-sm cursor-pointer"
          />
        )}
        {showInput && (
          <label htmlFor={inputType} className="label gap-2 flex-1">
            <input
              type={inputType ? inputType : "text"}
              id={inputName}
              autoComplete="off"
              defaultValue={value}
              placeholder={placeholder}
              className="input bg-white-0 glass h-8 text-white w-full placeholder-white"
              {...register(inputName, validation)}
            />
          </label>
        )}
        {showInput && showVisibilityButton && (
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

export default UpdateInput;

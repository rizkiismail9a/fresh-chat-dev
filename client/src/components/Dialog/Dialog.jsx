import { IoCloseSharp } from "react-icons/io5";
import "./dialog.css";

const Dialog = ({ children, onClose, visibility }) => {
  return (
    <div
      id="dialog-layout"
      className={`h-screen w-full bg-slate-900 bg-opacity-50 absolute top-0 left-0 z-10 flex items-center justify-center ${
        visibility ? "show-layout" : "hide-layout"
      }`}
    >
      <div
        className={`relative w-[400px] h-fit p-5 flex m-2 tablet:m-0 flex-col gap-2 rounded-md glass shadow-lg ${
          visibility ? "dialog-open" : "dialog-hidden"
        }`}
      >
        <IoCloseSharp
          className="text-white absolute right-5 text-xl cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Dialog;

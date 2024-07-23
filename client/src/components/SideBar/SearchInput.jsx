import { useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({ onChange }) => {
  const searchQuery = useRef("");

  const submit = (e) => {
    e.preventDefault();
    onChange(searchQuery.current.value);
  };

  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <input
        className="input rounded-md bg-transparent glass text-gray-50"
        type="text"
        placeholder="Find someone"
        ref={searchQuery}
      />
      <button className="btn btn-circle btn-warning">
        <IoSearchSharp className="text-white" />
      </button>
    </form>
  );
};

export default SearchInput;

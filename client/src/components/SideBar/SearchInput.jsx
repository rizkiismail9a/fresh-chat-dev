import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex gap-2 items-center">
      <input
        className="input rounded-md bg-transparent glass text-gray-50"
        type="text"
        placeholder="Find someone"
      />
      <button className="btn btn-circle btn-warning">
        <IoSearchSharp className="text-white" />
      </button>
    </form>
  );
};

export default SearchInput;

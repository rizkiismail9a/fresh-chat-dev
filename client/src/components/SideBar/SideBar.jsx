import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const SideBar = () => {
  return (
    <div className="flex flex-col gap-6 border-r border-slate-500 px-4 h-full">
      <SearchInput />
      <div className="divider h-1 my-0 py-0" />
      <div>
        <Conversations />
      </div>

      <div className="flex-1 flex items-end">
        <LogoutButton />
      </div>
    </div>
  );
};

export default SideBar;

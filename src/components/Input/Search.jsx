import { CiSearch } from "react-icons/ci";
import PropType from "prop-types";

function Search({ name, ...props }) {
  return (
    <div className="flex items-center flex-nowrap gap-[14px]">
      <input
        type="input"
        name={name}
        {...props}
        className="border-[1px] rounded-[20px] border-[#CA6680] bg-white outline-none h-[37px] placeholder:text-[#CA6680] text-[18px] pl-[30px] pr-[20px] py-[7px]"
      />
      <button className="w-fit p-2 rounded-full bg-[#CA6680]" type="button">
        <CiSearch size={23} color={"#ffffff"} />
      </button>
    </div>
  );
}

Search.propTypes = {
  name: PropType.string,
};

export default Search;

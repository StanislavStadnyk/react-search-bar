import React, { ChangeEvent, FC } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

interface SearchBarInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const SearchBarInput: FC<SearchBarInputProps> = ({
  value,
  onChange,
  onClear,
}) => {
  return (
    <div className="flex text-black items-center p-2 bg-white">
      <div className="p-1">
        <FaSearch />
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="flex-auto pl-3 pr-3"
      />

      <div className="p-1 flex items-center">
        <button type="button" onClick={onClear}>
          <IoCloseSharp />
        </button>
      </div>
    </div>
  );
};

export default SearchBarInput;

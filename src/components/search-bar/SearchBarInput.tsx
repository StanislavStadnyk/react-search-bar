import { ChangeEvent, FC } from "react";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="flex-auto pl-3 pr-3"
      />

      <div className="p-1 flex items-center">
        <button type="button" onClick={onClear}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBarInput;

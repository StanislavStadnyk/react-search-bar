import { FC } from "react";
import { SearchBarProductProps } from "./types";
import classNames from "classnames";
import Spinner from "../spinner/Spinner";
import SearchBarItem from "./SearchBarItem";

interface SearchBarDropdownProps {
  data: SearchBarProductProps[];
  isLoading: boolean;
  error: string;
}

const DropdownList: FC<Pick<SearchBarDropdownProps, "data">> = ({ data }) => (
  <ul
    className="flex flex-wrap self-start w-full"
    data-testid="search-bar-dropdown-list"
  >
    {data.map(({ id, price, title, thumbnail }) => (
      <li key={id} className="w-full p-4 md:w-2/4">
        <SearchBarItem id={id} price={price} title={title} imgUrl={thumbnail} />
      </li>
    ))}
  </ul>
);

const SearchBarDropdown: FC<SearchBarDropdownProps> = ({
  data,
  isLoading,
  error,
}) => {
  const cls = classNames(
    "absolute top-full left-5 right-5 bg-white text-black min-h-52 max-h-96 overflow-x-hidden overflow-y-auto flex justify-center items-center",
    {
      "text-red-500": error,
    },
  );

  const dropDownResult = data.length ? (
    <DropdownList data={data} />
  ) : (
    <p>No Data</p>
  );

  const dropDownContent = error ? <p>{error}</p> : dropDownResult;

  return (
    <div className={cls} data-testid="search-bar-dropdown">
      {isLoading ? <Spinner /> : dropDownContent}
    </div>
  );
};

export default SearchBarDropdown;

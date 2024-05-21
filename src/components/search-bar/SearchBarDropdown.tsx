import { FC } from "react";
import { SearchBarProductProps } from "./types";
import Spinner from "../spinner/Spinner";
import SearchBarItem from "./SearchBarItem";

interface SearchBarDropdownProps {
  data: SearchBarProductProps[];
  isLoading: boolean;
  error: string;
}

const DropdownList: FC<Pick<SearchBarDropdownProps, "data">> = ({ data }) => (
  <ul className="flex flex-wrap self-start">
    {data.map(({ id, price, description, thumbnail }) => (
      <li key={id} className="w-full p-4 md:w-2/4">
        <SearchBarItem
          id={id}
          price={price}
          description={description}
          imgUrl={thumbnail}
        />
      </li>
    ))}
  </ul>
);

const SearchBarDropdown: FC<SearchBarDropdownProps> = ({
  data,
  isLoading,
  error,
}) => {
  const errorCls = error ? "text-red-500" : "";

  const dropDownResult = data.length ? (
    <DropdownList data={data} />
  ) : (
    <p>No data</p>
  );

  const dropDownContent = error ? <p>{error}</p> : dropDownResult;

  return (
    <div
      className={`absolute top-full left-5 right-5 bg-white text-black min-h-52 max-h-96 overflow-x-hidden overflow-y-auto flex justify-center items-center ${errorCls}`}
    >
      {isLoading ? <Spinner /> : dropDownContent}
    </div>
  );
};

export default SearchBarDropdown;

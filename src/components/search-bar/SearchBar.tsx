import React, { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../hooks";
import SearchBarInput from "./SearchBarInput";
import SearchBarDropdown from "./SearchBarDropdown";
import { SearchBarProductProps } from "./types";
import { fetchSearchData } from "./helpers";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SearchBarProductProps[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // we can't use "useDeferredValue" hook on powerful machines, still need to use custom hook
  const debounceValue = useDebounce(query, 500);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);

    if (!query) {
      setData([]);
      setIsLoading(true);
      setError("");
    }
  };

  const handleInputClear = () => {
    setQuery("");
    setData([]);
    setIsLoading(true);
    setError("");
  };

  useEffect(() => {
    debounceValue &&
      fetchSearchData({
        query: debounceValue,
        setData,
        setError,
        setIsLoading,
      });
  }, [debounceValue]);

  return (
    <div className="relative z-10 w-full max-w-3xl pl-5 pr-5">
      <SearchBarInput
        value={query}
        onChange={handleInputChange}
        onClear={handleInputClear}
      />
      {query && (
        <SearchBarDropdown data={data} isLoading={isLoading} error={error} />
      )}
    </div>
  );
};

export default SearchBar;

import React, { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../hooks";
import SearchBarInput from "./SearchBarInput";
import SearchBarDropdown from "./SearchBarDropdown";
import { SearchBarProductProps } from "./types";
import axios from "axios";
import { API_URLS, QUERY_PARAMS } from "../../constants";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<SearchBarProductProps[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [debounceValue, isDebounced] = useDebounce(query, 500);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
  };

  const handleInputClear = () => {
    setQuery("");
  };

  useEffect(() => {
    if (!debounceValue) {
      setError("");
      setData([]);
      return;
    }

    (async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(API_URLS.PRODUCT_SEARCH, {
          params: {
            [QUERY_PARAMS.QUERY]: debounceValue,
          },
        });

        const products = response?.data?.products || [];
        setData(products);
      } catch (error) {
        setError("Error fetching search data");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [debounceValue]);

  return (
    <div className="relative z-10 w-full max-w-3xl pl-5 pr-5">
      <SearchBarInput
        value={query}
        onChange={handleInputChange}
        onClear={handleInputClear}
      />
      {query && (
        <SearchBarDropdown
          data={data}
          isLoading={isLoading || isDebounced}
          error={error}
        />
      )}
    </div>
  );
};

export default SearchBar;

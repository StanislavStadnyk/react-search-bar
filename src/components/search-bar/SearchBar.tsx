import { ChangeEvent, Suspense, useEffect, useState, lazy } from "react";
import useDebounce from "../../hooks";
import SearchBarInput from "./SearchBarInput";
import { SearchBarProductProps } from "./types";
import axios from "axios";
import { API_URLS, QUERY_PARAMS } from "../../constants";
import Spinner from "../spinner/Spinner";
const SearchBarDropdownLazy = lazy(() => import("./SearchBarDropdown"));

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
        <Suspense
          fallback={
            // it can be a common component for "fallback" and for "SearchBarDropdown"
            <div className="absolute top-full left-5 right-5 bg-white text-black min-h-52 max-h-96 overflow-x-hidden overflow-y-auto flex justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <SearchBarDropdownLazy
            data={data}
            isLoading={isLoading || isDebounced}
            error={error}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SearchBar;

import { ChangeEvent, Suspense, useState, lazy } from "react";
import useDebounce from "../../hooks";
import SearchBarInput from "./SearchBarInput";
import Spinner from "../spinner/Spinner";
import { useProductSearch } from "../../productHooks";
const SearchBarDropdownLazy = lazy(() => import("./SearchBarDropdown"));

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debounceValue, isDebounced] = useDebounce(query, 500);
  const { isLoading, error, data } = useProductSearch(debounceValue);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
  };

  const handleInputClear = () => {
    setQuery("");
  };

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

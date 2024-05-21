import { SEARCH_URL } from "../../constants";
import { SearchBarProductProps } from "./types";

interface FetchSearchDataProp {
  query: string;
  setData: (data: SearchBarProductProps[]) => void;
  setError: (error: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const fetchSearchData = async ({
  query,
  setData,
  setError,
  setIsLoading,
}: FetchSearchDataProp) => {
  setIsLoading(true);

  try {
    const response = await fetch(`${SEARCH_URL}${query}`);
    const result = await response.json();

    result?.products.length ? setData(result.products) : setData([]);
  } catch (error) {
    setError("Error fetching search data");
  } finally {
    setIsLoading(false);
  }
};

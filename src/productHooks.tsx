import { useEffect, useState } from "react";
import { SearchBarProductProps } from "./components/search-bar/types";
import axios from "axios";
import { API_URLS, QUERY_PARAMS } from "./constants";

export const useProductSearch = (debounceValue: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<SearchBarProductProps[] | []>([]);
  const [error, setError] = useState("");

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

  return {
    isLoading,
    data,
    error,
  };
};

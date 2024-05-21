export const BASE_URL = "https://dummyjson.com";

export const API_URLS = {
  PRODUCT_SEARCH: `${BASE_URL}/products/search`,
} as const;

export const QUERY_PARAMS = {
  QUERY: "q",
} as const;

export const ROUTES = {
  PRODUCT: "/product",
} as const;

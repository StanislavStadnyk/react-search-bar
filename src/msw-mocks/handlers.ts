import { rest } from "msw";
import { API_URLS, QUERY_PARAMS } from "../constants";
import {
  SearchBarQueryAll,
  SearchBarQueryHome,
  SearchBarQueryNoData,
} from "./data";

export const SearchBarSuccessHandler = () =>
  // @ts-ignore
  rest.get(API_URLS.PRODUCT_SEARCH, (request, response, context) => {
    const query = request.url.searchParams.get(QUERY_PARAMS.QUERY);

    let products;

    switch (query) {
      case "home":
        products = SearchBarQueryHome;
        break;
      case "testtest":
        products = SearchBarQueryNoData;
        break;
      default:
        products = SearchBarQueryAll;
        break;
    }

    return response(context.status(200), context.json(products));
  });

export const SearchBarErrorHandler = () =>
  // @ts-ignore
  rest.get(API_URLS.PRODUCT_SEARCH, (request, response, context) => {
    return response(
      context.status(500),
      context.json({ message: "internal server error" }),
    );
  });

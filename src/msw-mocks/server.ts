import { setupServer } from "msw/node";
import { SearchBarSuccessHandler, SearchBarErrorHandler } from "./handlers";

const handlers = [SearchBarSuccessHandler(), SearchBarErrorHandler()];

export const server = setupServer(...handlers);

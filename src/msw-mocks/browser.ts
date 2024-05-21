import { setupWorker } from "msw";
import { SearchBarSuccessHandler, SearchBarErrorHandler } from "./handlers";

const handlers = [SearchBarSuccessHandler(), SearchBarErrorHandler()];

export const worker = setupWorker(...handlers);

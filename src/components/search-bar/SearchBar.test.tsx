import { render } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("Should render no data", () => {
    render(<SearchBar />);
  });
});

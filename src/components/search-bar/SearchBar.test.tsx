import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import { server } from "../../msw-mocks/server";
import { SearchBarErrorHandler } from "../../msw-mocks/handlers";

describe("SearchBar", () => {
  it("Should render 3 items - 'q=home'", async () => {
    render(<SearchBar />);

    const input = await screen.findByRole("textbox");
    userEvent.type(input, "home");

    await screen.findByTestId("search-bar-dropdown-list");
    expect(screen.getAllByRole("link").length).toBe(3);
  });

  it("Should render 15 items - 'q=all'", async () => {
    render(<SearchBar />);

    const input = await screen.findByRole("textbox");
    userEvent.type(input, "all");

    await screen.findByTestId("search-bar-dropdown-list");
    expect(screen.getAllByRole("link").length).toBe(15);
  });

  it("Should render - 'No Data'", async () => {
    render(<SearchBar />);

    const input = await screen.findByRole("textbox");
    userEvent.type(input, "testtest");

    await screen.findByText("No Data");
  });

  it("Should render - 'Error fetching search data'", async () => {
    server.use(SearchBarErrorHandler());
    render(<SearchBar />);

    const input = await screen.findByRole("textbox");
    userEvent.type(input, "testtest");

    await screen.findByText("Error fetching search data");
  });

  it("Should clear data and close dropdown", async () => {
    render(<SearchBar />);

    const input = await screen.findByRole("textbox");
    userEvent.type(input, "testtest");

    const button = await screen.findByRole("button");
    userEvent.click(button);

    expect(screen.queryByTestId("search-bar-dropdown")).not.toBeInTheDocument();
  });
});

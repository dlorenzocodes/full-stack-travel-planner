import SearchBar from "../components/SearchBar";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../tests-utils/tests-utils";
import userEvent from "@testing-library/user-event";

describe("search bar", () => {
  test("should display city info upon succesfull api call", async () => {
    const user = userEvent.setup();

    // render Search component
    renderWithProviders(<SearchBar />);

    // Grab search bar and type city
    const searchInput = screen.getByPlaceholderText(/search for places/i);
    await user.clear(searchInput);
    await user.type(searchInput, "Miami");

    // Grab search icon and send request
    const searchIcon = screen.getByRole("img", {
      name: /magnifying-glass-icon/i,
    });
    await user.click(searchIcon);

    // Upon success, modal should appear with city image and info

    // Close modal
  });
});

// import SearchBar from "../components/SearchBar";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../tests-utils/tests-utils";
import userEvent from "@testing-library/user-event";
import Explore from "../pages/Explore";

describe("search bar", () => {
  test("should display city info upon succesfull api call", async () => {
    const user = userEvent.setup();

    // render Search component
    renderWithProviders(<Explore />);

    // Grab search bar and type city
    const searchInput = await screen.findByPlaceholderText(
      /search for places/i
    );
    await user.clear(searchInput);
    await user.type(searchInput, "Miami");

    // Grab search icon and send request
    const searchIcon = await screen.findByRole("img", {
      name: /magnifying-glass-icon/i,
    });
    await user.click(searchIcon);

    // Upon success, modal should appear with city image and info
    const cityModal = await screen.findByRole("heading", {
      name: /miami in your mind/i,
    });

    expect(cityModal).toBeInTheDocument();

    // Close modal
  });
});

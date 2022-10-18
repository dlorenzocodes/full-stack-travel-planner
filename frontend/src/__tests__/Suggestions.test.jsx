import { screen } from "@testing-library/react";
import { renderWithProviders } from "../tests-utils/tests-utils";
import Suggestions from "../components/Suggestions";

test("should desplay suggestions", async () => {
  renderWithProviders(<Suggestions />);

  const sectionHeading = await screen.findByRole("heading", {
    name: "Planning your next trip?",
  });
  expect(sectionHeading).toBeInTheDocument();
});

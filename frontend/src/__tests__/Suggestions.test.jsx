import { screen } from "@testing-library/react";
import { renderWithProviders } from "../tests-utils/tests-utils";
import Suggestions from "../components/Suggestions";
import { server } from "../mocks/server";
import { rest } from "msw";

test("should display suggestions upon successfull api call", async () => {
  renderWithProviders(<Suggestions />);

  // grab main heading and test is on the page
  const sectionHeading = await screen.findByRole("heading", {
    name: "Planning your next trip?",
  });
  expect(sectionHeading).toBeInTheDocument();

  // grab suggestions images
  const suggestionsImages = await screen.findAllByRole("img", {
    name: /landscape field/i,
  });
  expect(suggestionsImages).toHaveLength(4);

  // check city suggestions
  const miamiSuggestion = await screen.findByRole("heading", { name: "Miami" });
  const tampaSuggestion = await screen.findByRole("heading", { name: "Tampa" });
  expect(miamiSuggestion).toBeInTheDocument();
  expect(tampaSuggestion).toBeInTheDocument();

  // check attraction suggestions
  const paneraAttr = await screen.findByRole("heading", { name: "Panera" });
  const paneraAddress = await screen.findByText(/spring street/i);
  expect(paneraAttr).toBeInTheDocument();
  expect(paneraAddress).toBeInTheDocument();
});

test("should display error message upon api call error", async () => {
  server.resetHandlers(
    rest.get("/places/recomendations", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  renderWithProviders(<Suggestions />);

  const errorMessage = await screen.findByText(
    /suggestions can't be provided/i
  );
  const errorImage = await screen.findByRole("img", {
    name: /bad request graphic/i,
  });
  expect(errorMessage).toBeInTheDocument();
  expect(errorImage).toBeInTheDocument();
});

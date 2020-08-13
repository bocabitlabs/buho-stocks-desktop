import React from "react";
import HomeRoute from "./HomeRoute";
import { renderWithRouterAndRedux } from "../../utils/test-utils";

describe("HomeRoute compnent tests", () => {
  test("renders the component", () => {
    const { getByTestId } = renderWithRouterAndRedux(<HomeRoute />);
    let element = getByTestId(/home-route/i);
    expect(element).toBeInTheDocument();
  });
});

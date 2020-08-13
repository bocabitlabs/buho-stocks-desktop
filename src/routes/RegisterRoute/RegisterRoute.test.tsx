import React from "react";
import RegisterRoute from "./RegisterRoute";
import { renderWithRouterAndRedux } from "../../utils/test-utils";

describe("RegisterRoute compnent tests", () => {

  test("renders the component", () => {
    const initialState = {
      firebase: {
        auth: {
          isLoaded: true
        }
      },
    }
    const { getByText, getAllByText } = renderWithRouterAndRedux(<RegisterRoute />, {initialState});
    const elements = getAllByText(/Sign up/i);
    expect(elements.length).toBe(2);
    let element = getByText(/Email/i);
    expect(element).toBeInTheDocument();
    element = getByText(/Password/i);
    expect(element).toBeInTheDocument();
  });
});

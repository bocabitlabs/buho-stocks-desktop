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
    const { getAllByText } = renderWithRouterAndRedux(<RegisterRoute />, {initialState});
    let elements = getAllByText(/Email/i);
    expect(elements.length).toBe(2);
    elements = getAllByText(/Password/i);
    expect(elements.length).toBe(3);
  });
});

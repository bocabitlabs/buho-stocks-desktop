import React from "react";
import LoginRoute from "./LoginRoute";
import { renderWithRouterAndRedux } from "../../utils/test-utils";

describe("LoginRoute compnent tests", () => {
  test("renders the spinner", () => {
    const { getByTestId } = renderWithRouterAndRedux(<LoginRoute />);
    let element = getByTestId(/login-spinner/i);
    expect(element).toBeInTheDocument();
  });

  test("renders the component", () => {
    const initialState = {
      firebase: {
        auth: {
          isLoaded: true
        }
      },
    }
    const { getAllByText } = renderWithRouterAndRedux(<LoginRoute />, {initialState});
    let elements = getAllByText(/Log in/i);
    expect(elements.length).toBe(1);
    elements = getAllByText(/Email/i);
    expect(elements.length).toBe(2);

    elements = getAllByText(/Password/i);
    expect(elements.length).toBe(2);
  });

  test("redirects to home", () => {
    const initialState = {
      firebase: {
        auth: {
          isLoaded: true,
          uid: "12345"
        }
      },
    }
    const { getByTestId } = renderWithRouterAndRedux(<LoginRoute />, {initialState});
    const element = getByTestId(/redirect-id/i);
    expect(element).toBeInTheDocument();
  });
});

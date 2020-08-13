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
    const { getByText, getAllByText } = renderWithRouterAndRedux(<LoginRoute />, {initialState});
    const elements = getAllByText(/Log in/i);
    expect(elements.length).toBe(2);
    let element = getByText(/Email/i);
    expect(element).toBeInTheDocument();
    element = getByText(/Password/i);
    expect(element).toBeInTheDocument();
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

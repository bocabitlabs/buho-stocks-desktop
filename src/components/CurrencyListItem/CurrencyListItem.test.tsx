import React from "react";
import CurrencyListItem from "./CurrencyListItem";
import { render } from "../../utils/test-utils";

describe("CurrencyListItem component tests", () => {

  let initialState;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders currency name", () => {
    initialState = {
      firebase: {
        auth: {}
      },
      firestore: {
        data: {
          currencies: {
            abcdefg: {
              name: "Euro",
              abbreviation: "EUR"
            }
          }
        }
      }
    };

    const { getByText } = render(
      <CurrencyListItem id={"abcdefg"} />,
      { initialState }
    );
    let element = getByText(/Euro/i);
    expect(element).toBeInTheDocument();
    element = getByText(/Delete/i);
    expect(element).toBeInTheDocument();
  });
});
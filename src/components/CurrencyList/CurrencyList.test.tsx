import React from "react";
import CurrencyList from "./CurrencyList";
import { render, renderWithRouterAndRedux } from "../../utils/test-utils";

describe("CurrencyList compnent tests", () => {
  let initialState;

  test("renders currency list spinner", () => {
    initialState = {
      firestore: {
        data: {
          companies: {
            abcdefg: {
              name: "Test Company",
            }
          }
        },
        ordered: {
          companies: []
        }
      }
    };

    const { getByTestId } = render(<CurrencyList uid={"123"} />, {
      initialState
    });
    const element = getByTestId(/currency-spinner/i);
    expect(element).toBeInTheDocument();
  });

  test("renders empty currency list", () => {
    const initialState = {
      firebase: {
        auth: {}
      },
      firestore: {
        data: {
          currencies: {
            abcdefg: {
              name: "Currency",
            }
          }
        },
        ordered: {
          currencies: []
        }
      }
    };

    const { getByText } = render(<CurrencyList uid={"123"} />, { initialState });
    const element = getByText(/Currency list is empty/i);
    expect(element).toBeInTheDocument();
  });

  test("renders company list", () => {
    const initialState = {
      firebase: {
        auth: {}
      },
      firestore: {
        data: {
          currencies: {
            abcdefg: {
              name: "Euro",
            }
          }
        },
        ordered: {
          currencies: [
            {
              name: "EURO",
              abreviation: "EUR",
              id: "abcdefg"
            }
          ]
        }
      }
    };

    const { getByTestId } = renderWithRouterAndRedux(
      <CurrencyList uid={"123"} />,
      { initialState }
    );
    let element = getByTestId(/currency-list/i);
    expect(element).toBeInTheDocument();
  });
});

import React from "react";
import CompanyList from "./CompanyList";
import { render, renderWithRouterAndRedux } from "../../utils/test-utils";

describe("CompanyList compnent tests", () => {
  let initialState;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders company list spinner", () => {
    initialState = {
      firestore: {
        data: {
          currencies: {
            abcdefg: {
              name: "Test Company",
              ticker: "TEST:TC"
            }
          }
        },
        ordered: {
          currencies: []
        }
      }
    };

    const { getByTestId } = render(<CompanyList uid={"123"} />, {
      initialState
    });
    const element = getByTestId(/company-spinner/i);
    expect(element).toBeInTheDocument();
  });

  test("renders empty company list", () => {
    const initialState = {
      firebase: {
        auth: {}
      },
      firestore: {
        data: {
          companies: {
            abcdefg: {
              name: "Test Company",
              ticker: "TEST:TC"
            }
          }
        },
        ordered: {
          companies: []
        }
      }
    };

    const { getByText } = render(<CompanyList uid={"123"} />, { initialState });
    const element = getByText(/Company list is empty/i);
    expect(element).toBeInTheDocument();
  });

  test("renders company list", () => {
    const initialState = {
      firebase: {
        auth: {}
      },
      firestore: {
        data: {
          companies: {
            abcdefg: {
              name: "Test Company",
              ticker: "TEST:TC"
            }
          }
        },
        ordered: {
          companies: [
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
      <CompanyList uid={"123"} />,
      { initialState }
    );
    let element = getByTestId(/company-list/i);
    expect(element).toBeInTheDocument();
  });
});

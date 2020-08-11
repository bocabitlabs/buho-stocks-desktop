import React from "react";
import { render } from "@testing-library/react";
import CompanyList from "./CompanyList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

describe("CompanyList compnent tests", () => {
  const mockStore = configureStore();
  let store;
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
    store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <CompanyList uid={"123"} />
      </Provider>
    );
    const element = getByTestId(/company-spinner/i);
    expect(element).toBeInTheDocument();
  });

  test("renders empty company list", () => {
    const history = createMemoryHistory();

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

    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <CompanyList uid={"123"} />
        </Router>
      </Provider>
    );
    const element = getByText(/Company list is empty/i);
    expect(element).toBeInTheDocument();
  });

  test("renders company list", () => {
    const history = createMemoryHistory();

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

    store = mockStore(initialState);

    const { getByTestId } = render(
      <Provider store={store}>
        <Router history={history}>
          <CompanyList uid={"123"} />
        </Router>
      </Provider>
    );
    const element = getByTestId(/company-list/i);
    expect(element).toBeInTheDocument();
  });
});

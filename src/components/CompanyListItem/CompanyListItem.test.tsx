import React from "react";
import { render } from "@testing-library/react";
import CompanyListItem from "./CompanyListItem";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

describe("CompanyListItem component tests", () => {
  const mockStore = configureStore();
  const history = createMemoryHistory();

  let store;
  let initialState;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders company item spinner", () => {
    initialState = {
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
        <CompanyListItem id={"abcdefg"} />

        </Router>
      </Provider>
    );
    let element = getByText(/Test Company/i);
    expect(element).toBeInTheDocument();
    element = getByText(/TEST:TC/i);
    expect(element).toBeInTheDocument();
  });
});

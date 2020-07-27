import React from "react";
import { render } from "@testing-library/react";
import AddCompanyForm from "./AddCompanyForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("AddCompanyForm compnent tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialState = {
    firebase: {
      auth: {}
    },
    firestore: {
      ordered: {
        currencies: [
          {
            name: "EURO",
            abreviation: "EUR",
            userId: "yOKXJuaMhWYrjOijyAfv24bgxAj1"
          },
          {
            name: "PEPO",
            userId: "yOKXJuaMhWYrjOijyAfv24bgxAj1",
            abreviation: "POP"
          }
        ]
      }
    }
  };
  const mockStore = configureStore();
  let store;

  test("renders Company Name field", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Company Name/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Ticker field", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Ticker/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Market Name field", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Market name/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Ticker field", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Ticker/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Notes field", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Notes/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Link field", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Link/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Currency field", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Currency/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Add Company button", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <AddCompanyForm />
      </Provider>
    );
    const element = getByText(/Add Company/i);
    expect(element).toBeInTheDocument();
  });
});

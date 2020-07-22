import React from "react";
import { render } from "@testing-library/react";
import CurrencyItem from "./CurrencyItem";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("CurrencyItem compnent tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const initialState = {
    firestore: {
      data: {
        currencies: {
          TxRUecEyl2xEpmPXbY9j: {
            name: "EURO",
            abreviation: "EUR",
            userId: "yOKXJuaMhWYrjOijyAfv24bgxAj1"
          },
          XZYA5Kf1ng0JHgrCOPe0: {
            name: "PEPO",
            userId: "yOKXJuaMhWYrjOijyAfv24bgxAj1",
            abreviation: "POP"
          }
        }
      }
    }
  };

  const mockStore = configureStore();
  let store;

  test("renders Delete button", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <CurrencyItem id={"TxRUecEyl2xEpmPXbY9j"} />
      </Provider>
    );
    const deleteElement = getByText(/Delete/i);
    expect(deleteElement).toBeInTheDocument();
  });

  // it("clicks the delete button", () => {
  //   store = mockStore(initialState);

  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <CurrencyItem id={"TxRUecEyl2xEpmPXbY9j"} />
  //     </Provider>
  //   );

  //   // fireEvent.click(getByText(/Delete/i));
  //   // expect(spy).toHaveBeenCalled();
  // });
});

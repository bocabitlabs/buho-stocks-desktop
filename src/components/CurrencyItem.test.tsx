import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CurrencyItem from "./CurrencyItem";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
// import { useFirestore } from "react-redux-firebase";
// import firebase from "firebase";
// jest.mock("CurrencyItem.deleteCurrency", () => {
//   return {
//     delete: jest.fn()
//   };
// });

// jest.mock("react-redux-firebase", () => ({
//   useFirestore: () => ({
//     delete: jest.fn()
//   })
// }));

describe("CurrencyItem compnent tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  //   useFirestore.mockReturnValue({
  //     delete: jest.fn(),
  //     data: null
  //   });

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
  let store, wrapper;

  test("renders Delete button", () => {
    store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <CurrencyItem id={"TxRUecEyl2xEpmPXbY9j"} />
      </Provider>
    );
    const linkElement = getByText(/Delete/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("clicks the delete button", () => {
    store = mockStore(initialState);

    // const firestoreMock = {
    //   collection: jest.fn().mockReturnThis(),
    //   doc: jest.fn().mockReturnThis(),
    //   set: jest.fn().mockReturnThis(),
    //   settings: jest.fn().mockReturnThis(),
    //   enablePersistence: jest.fn().mockReturnThis(),
    //   batch: jest.fn().mockReturnThis(),
    //   runTransaction: jest.fn().mockReturnThis(),
    //   clearPersistence: jest.fn().mockReturnThis(),
    //   app: jest.fn().mockReturnThis(),
    //   collectionGroup: jest.fn().mockReturnThis(),
    //   enableNetwork: jest.fn().mockReturnThis(),
    //   disableNetwork: jest.fn().mockReturnThis(),
    //   waitForPendingWrites: jest.fn().mockReturnThis(),
    //   onSnapshotsInSync: jest.fn().mockReturnThis(),
    //   terminate: jest.fn().mockReturnThis(),
    //   INTERNAL: jest.fn().mockReturnThis()
    // };

    // //   const clearFieldsSpy = jest.spyOn(MyComponent.prototype, 'clearFields');
    // jest.spyOn(firebase, "firestore");
    // const spy = jest.spyOn(CurrencyItem.prototype, "deleteCurrency");

    const { getByText } = render(
      <Provider store={store}>
        <CurrencyItem id={"TxRUecEyl2xEpmPXbY9j"} />
      </Provider>
    );

    // const firestore = useFirestore();

    // const update = jest.fn();
    // const doc = jest.fn(() => ({update}));
    // const collection = jest.spyOn(firestore.delete(), 'collection').mockReturnValue((({ doc } as unknown) as any);

    // fireEvent.click(getByText(/Delete/i));
    // expect(spy).toHaveBeenCalled();
    // const elem = getByTestId("item");
    // expect(elem.classList[0]).toBe("selected");
  });
});

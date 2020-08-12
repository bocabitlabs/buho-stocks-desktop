import React from "react";
import CompanyListItem from "./CompanyListItem";
import { renderWithRouterAndRedux } from "../../utils/test-utils";

describe("CompanyListItem component tests", () => {

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

    const { getByText } = renderWithRouterAndRedux(
      <CompanyListItem id={"abcdefg"} />,
      { initialState }
    );
    let element = getByText(/Test Company/i);
    expect(element).toBeInTheDocument();
    element = getByText(/TEST:TC/i);
    expect(element).toBeInTheDocument();
  });
});

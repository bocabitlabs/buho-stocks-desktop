import React from "react";
import CompanyDetails from "./CompanyDetails";
import { render } from "../../utils/test-utils";

describe("CompanyDetails component tests", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders company details", () => {
    const initialState = {
      firebase: {
        auth: {}
      },
      firestore: {
        data: {
          abcdefg: {
            name: "Test Company",
            ticker: "TEST:TC",
            market: "USA",
            notes: "These are the company notes"
          }
        }
      }
    };

    const { getByText, getAllByText } = render(
        <CompanyDetails uid={"12345"} id="abcdefg" />
      ,
      {initialState}
    );
    let element = getByText(/Test Company/i);
    expect(element).toBeInTheDocument();
    let elements = getAllByText(/TEST:TC/i);
    expect(elements.length).toEqual(2);

    element = getByText(/Test Company/i);
    expect(element).toBeInTheDocument();

    element = getByText(/USA/i);
    expect(element).toBeInTheDocument();

    element = getByText(/These are the company notes/i);
    expect(element).toBeInTheDocument();
  });
});

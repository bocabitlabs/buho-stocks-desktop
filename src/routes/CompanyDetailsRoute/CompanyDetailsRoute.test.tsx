import React from "react";
import CompanyDetailsRoute from "./CompanyDetailsRoute";
import { renderWithRouterAndRedux } from "../../utils/test-utils";

describe("CompanyDetailsRoute compnent tests", () => {
  test("renders the component", () => {
    const { getByText } = renderWithRouterAndRedux(<CompanyDetailsRoute />);
    let element = getByText(/Company Details/i);
    expect(element).toBeInTheDocument();
  });
});

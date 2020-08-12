import React from "react";
import AddCurrencyForm from "./AddCurrencyForm";
import { render } from "../../utils/test-utils";

describe("AddCurrencyForm compnent tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders Currency Name field", () => {
    const { getByText } = render(<AddCurrencyForm />);
    const element = getByText(/Currency Name/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Abbreviation field", () => {
    const { getByText } = render(<AddCurrencyForm />);
    const element = getByText(/Abbreviation/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Symbol field", () => {
    const { getByText } = render(<AddCurrencyForm />);
    const element = getByText(/Symbol/i);
    expect(element).toBeInTheDocument();
  });

  test("renders Add Company button", () => {
    const { getByText } = render(<AddCurrencyForm />);
    const element = getByText(/Add Currency/i);
    expect(element).toBeInTheDocument();
  });
});

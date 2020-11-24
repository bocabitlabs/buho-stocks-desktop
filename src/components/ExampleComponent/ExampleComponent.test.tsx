import React from "react";
import { ExampleComponent, ExampleComponentWithType } from "./ExampleComponent";
import { render } from "../../utils/test-utils";

describe("ExampleComponent component tests", () => {

  test("renders text", () => {
    const { getByText } = render(<ExampleComponent who="me" />);
    let element = getByText(/Hello this is me/i);
    expect(element).toBeInTheDocument();
  });
});

describe("ExampleComponentWithType component tests", () => {

  test("renders text", () => {
    const { getByText } = render(<ExampleComponentWithType who="me" />);
    let element = getByText(/Hello this is me/i);
    expect(element).toBeInTheDocument();
  });
});
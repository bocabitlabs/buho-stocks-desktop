import React from "react";
import LogoutButton from "./LogoutButton";
import { render } from "../../utils/test-utils";

describe("LogoutButton component tests", () => {
  test("renders logout text", () => {
    const { getByText } = render(<LogoutButton />);
    let element = getByText(/Sign out/i);
    expect(element).toBeInTheDocument();
  });
});

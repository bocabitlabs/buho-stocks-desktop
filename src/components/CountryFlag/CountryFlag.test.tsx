import React from "react";
import CountryFlag from "./CountryFlag";
import { render } from "utils/test-utils";
import { screen } from "@testing-library/react";

describe("<CountryFlag/> component tests", () => {

  test("it renders title", async () => {
    render(<CountryFlag code="es" />);
    const element = screen.getByTitle("Flag for Spain");
    expect(element).toBeInTheDocument();
    const items = await screen.findAllByTitle(/Flag for Spain/);
    expect(items).toHaveLength(1)
  });

  test("it renders null with unknown language", async () => {
    const {container} = render(<CountryFlag code="ess" />);
    expect(container.firstChild).toBe(null)
  });
});

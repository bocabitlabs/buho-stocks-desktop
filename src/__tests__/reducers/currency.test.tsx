import { currencies } from "../../reducers/currency";

it("Adds a currency", () => {
  expect(
    currencies([], {
      abbreviation: "EUR",
      name: "Euro",
      type: "Add a new currency"
    })
  ).toEqual([
    {
      abbreviation: "EUR",
      id: 0,
      name: "Euro"
    }
  ]);
});

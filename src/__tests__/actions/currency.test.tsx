import { addCurrency } from "../../actions/currency";

export function sum(a: number, b: number): number {
  return a + b;
}

it("sums numbers", () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});

it("Adds a currency", () => {
  expect(addCurrency("Euro", "EUR")).toEqual({
    abbreviation: "EUR",
    name: "Euro",
    type: "Add a new currency"
  });
});

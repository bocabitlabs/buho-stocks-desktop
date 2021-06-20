import CurrencyService from "./currencies-service";
import { ICurrency, CurrencyFormFields } from "types/currency";

const returnAllExample: ICurrency[] = [
  {
    id: "1",
    name: "US Dolar",
    color: "color1",
    abbreviation: "USD",
    symbol: "$",
    country: "USA"
  },
  {
    id: "2",
    name: "Euro",
    color: "color1",
    abbreviation: "EUR",
    symbol: "€",
    country: "European Union"
  }
];

jest.mock("database/daos/currency-dao/currency-dao", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  getByName: () => returnAllExample[1],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

describe("CurrencyService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = CurrencyService.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id", () => {
    const result = CurrencyService.getById("1");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("get by name", () => {
    const result = CurrencyService.getByName("1");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("delete by id", () => {
    const result = CurrencyService.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("export all", () => {
    const result = CurrencyService.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("create", () => {
    const newElement: CurrencyFormFields = {
      name: "US Dolar",
      color: "color1",
      abbreviation: "USD",
      symbol: "$",
      country: "USA"
    };

    const result = CurrencyService.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update", () => {
    const newElement: CurrencyFormFields = {
      name: "US Dolar",
      color: "color1",
      abbreviation: "USD",
      symbol: "$",
      country: "USA"
    };

    const result = CurrencyService.update("1", newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });
});

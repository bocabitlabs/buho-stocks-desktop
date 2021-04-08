import sendIpcSql from "message-control/renderer";
import { ICurrency } from "types/currency";
import CurrencyDAO from "./currency-dao";

jest.mock("message-control/renderer");

const returnAllExample: ICurrency[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Currency DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = CurrencyDAO.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = CurrencyDAO.getById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by name element 1", () => {
    const result = CurrencyDAO.getByName("NYSE");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = CurrencyDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = CurrencyDAO.create({
      name: "name",
      color: "color",
      symbol: "symbol",
      abbreviation: "abbreviation",
      country: "country"
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = CurrencyDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("update by id", () => {
    const result = CurrencyDAO.update("1", {
      name: "name",
      color: "color",
      symbol: "symbol",
      abbreviation: "abbreviation",
      country: "country"
    });
    expect(result).toStrictEqual(returnAllExample);
  });
});

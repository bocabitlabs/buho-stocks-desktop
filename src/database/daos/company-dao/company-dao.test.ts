import sendIpcSql from "message-control/renderer";
import CompanyDAO from "./company-dao";

jest.mock("message-control/renderer");

const returnAllExample: string[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Company DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = CompanyDAO.getAll("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = CompanyDAO.getById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = CompanyDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = CompanyDAO.create({
      name: "name",
      description: "description",
      color: "color",
      countryCode: "es",
      ticker: "ABCD.Z",
      alternativeTickers:"ABCD,EDFG",
      broker: "broker",
      closed: false,
      currencyId: "1",
      dividendsCurrencyId: "1",
      marketId: "1",
      portfolioId: "1",
      sectorId: "1",
      url: ""
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = CompanyDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by ticker", () => {
    const result = CompanyDAO.getByTicker("AAA");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get first transaction", () => {
    const result = CompanyDAO.getFirstTransaction("AAA");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by ticker and Portfolio", () => {
    const result = CompanyDAO.getByTickerPortfolio("AAA", "1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("update by id", () => {
    const result = CompanyDAO.update("1", {
      name: "name",
      description: "description",
      color: "color",
      countryCode: "es",
      ticker: "ABCD.Z",
      alternativeTickers:"ABCD,EDFG",
      broker: "broker",
      closed: false,
      currencyId: "1",
      dividendsCurrencyId: "1",
      marketId: "1",
      portfolioId: "1",
      sectorId: "1",
      url: ""
    });
    expect(result).toStrictEqual(returnAllExample);
  });
});

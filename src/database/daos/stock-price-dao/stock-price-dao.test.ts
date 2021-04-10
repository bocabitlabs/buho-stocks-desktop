import sendIpcSql from "message-control/renderer";
import { ISector } from "types/sector";
import StockPriceDAO from "./stock-price-dao";

jest.mock("message-control/renderer");

const returnAllExample: ISector[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("StockPrice DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = StockPriceDAO.getAll("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = StockPriceDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get last stock by company id", () => {
    const result = StockPriceDAO.getLastStockPriceByCompanyId("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get last stock of year by company id", () => {
    const result = StockPriceDAO.getLastStockPricePerYearByCompanyId("1", "2019");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = StockPriceDAO.create({
      price: 1.1,
      transactionDate: "01-01-2021",
      companyId: "1",
      exchangeRate: 0.5
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = StockPriceDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });
});

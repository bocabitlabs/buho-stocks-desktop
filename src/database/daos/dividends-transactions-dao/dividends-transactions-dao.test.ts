import sendIpcSql from "message-control/renderer";
import { ISector } from "types/sector";
import DividendsTransactionDAO from "./dividends-transactions-dao";

jest.mock("message-control/renderer");

const returnAllExample: ISector[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Dividends Transactions DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = DividendsTransactionDAO.getAll("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = DividendsTransactionDAO.getById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = DividendsTransactionDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = DividendsTransactionDAO.create({
      count: 1,
      commission: 0.5,
      price: 10,
      color: "color",
      companyId: "1",
      exchangeRate: 0.5,
      notes: "These are the notes",
      transactionDate: "2021-01-01"
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = DividendsTransactionDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("update by id", () => {
    const result = DividendsTransactionDAO.update("1", {
      count: 1,
      commission: 0.5,
      price: 10,
      color: "color",
      companyId: "1",
      exchangeRate: 0.5,
      notes: "These are the notes",
      transactionDate: "2021-01-01"
    });
    expect(result).toStrictEqual(returnAllExample);
  });
});

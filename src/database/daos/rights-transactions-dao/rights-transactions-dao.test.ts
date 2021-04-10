import sendIpcSql from "message-control/renderer";
import { ISector } from "types/sector";
import { TransactionType } from "types/transaction";
import RightsTransactionDAO from "./rights-transactions-dao";

jest.mock("message-control/renderer");

const returnAllExample: ISector[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Rights Transactions DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = RightsTransactionDAO.getAll("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = RightsTransactionDAO.getById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = RightsTransactionDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = RightsTransactionDAO.create({
      count: 1,
      type: TransactionType.BUY,
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
    const result = RightsTransactionDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("update by id", () => {
    const result = RightsTransactionDAO.update("1", {
      count: 1,
      type: TransactionType.BUY,
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

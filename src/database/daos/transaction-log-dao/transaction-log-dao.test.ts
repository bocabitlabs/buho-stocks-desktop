import sendIpcSql from "message-control/renderer";
import { ITransactionLogMessage } from "types/transaction-log";
import TransactionLogDAO from "./transaction-log-dao";

jest.mock("message-control/renderer");

const returnAllExample: ITransactionLogMessage[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Transaction Log DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = TransactionLogDAO.getAll("1");
    expect(result).toStrictEqual(returnAllExample);
  });


  test("add a new element", () => {
    const result = TransactionLogDAO.create({
      portfolioId: 1,
      type: "type",
      message: "message"
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = TransactionLogDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });
});

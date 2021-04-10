import sendIpcSql from "message-control/renderer";
import { ISector } from "types/sector";
import ExchangeRateDAO from "./exchange-rate-dao";

jest.mock("message-control/renderer");

const returnAllExample: ISector[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Exchange Rate DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = ExchangeRateDAO.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = ExchangeRateDAO.get("01-01-2021", "USDEUR");
    expect(result).toStrictEqual(returnAllExample);
  });


  test("add a new element", () => {
    const result = ExchangeRateDAO.create({
      exchangeName: "USDEUR",
      exchangeValue: 0.5,
      transactionDate: "01-01-2021"
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = ExchangeRateDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });
});

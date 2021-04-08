import sendIpcSql from "message-control/renderer";
import { IMarket } from "types/market";
import MarketDAO from "./market-dao";

jest.mock("message-control/renderer");

const returnAllExample: IMarket[] = [
  {
    id: "1",
    name: "NYSE",
    description: "New York stock exchange (NYSE)",
    color: "#607d8b",
    region: "United States",
    openTime: "13:30",
    closeTime: "20:00"
  },
  {
    id: "2",
    name: "LSE",
    description: "London stock exchange",
    color: "#607d8b",
    region: "Great Britain",
    openTime: "08:00",
    closeTime: "16:30"
  },
  {
    id: "3",
    name: "NASDAQ",
    description: "United States stock exchange (NASDAQ)",
    color: "#607d8b",
    region: "United States",
    openTime: "13:30",
    closeTime: "20:00"
  },
  {
    id: "4",
    name: "SIX",
    description: "Swiss stock exchange",
    color: "#607d8b",
    region: "Switzerland",
    openTime: "08:00",
    closeTime: "16:30"
  }
];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Market DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = MarketDAO.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = MarketDAO.getById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by name element 1", () => {
    const result = MarketDAO.getByName("NYSE");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = MarketDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = MarketDAO.create({
      name: "name",
      region: "region",
      color: "color",
      openTime: "openTime",
      closeTime: "closeTime",
      description: "description"
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = MarketDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("update by id", () => {
    const result = MarketDAO.update("1", {
      name: "name",
      region: "region",
      color: "color",
      openTime: "openTime",
      closeTime: "closeTime",
      description: "description"
    });
    expect(result).toStrictEqual(returnAllExample);
  });
});

import sendIpcSql from "message-control/renderer";
import PortfolioDAO from "./portfolio-dao";

jest.mock("message-control/renderer");

const returnAllExample: string[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Portfolio DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = PortfolioDAO.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = PortfolioDAO.getById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by name element 1", () => {
    const result = PortfolioDAO.getByName("NYSE");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = PortfolioDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = PortfolioDAO.create({
      name: "name",
      description: "description",
      color: "color",
      currencyId: 1
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = PortfolioDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("update by id", () => {
    const result = PortfolioDAO.update("1", {
      name: "name",
      description: "description",
      color: "color",
      currencyId: 1
    });
    expect(result).toStrictEqual(returnAllExample);
  });
});

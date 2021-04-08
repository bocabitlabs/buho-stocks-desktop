import sendIpcSql from "message-control/renderer";
import { ISector } from "types/sector";
import SectorDAO from "./sector-dao";

jest.mock("message-control/renderer");

const returnAllExample: ISector[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Sector DAO tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("getAll return all results", () => {
    const result = SectorDAO.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = SectorDAO.getById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by name element 1", () => {
    const result = SectorDAO.getByName("NYSE");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("export all", () => {
    const result = SectorDAO.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("add a new element", () => {
    const result = SectorDAO.create({
      name: "name",
      color: "color",
      isSuperSector: false
    });
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = SectorDAO.deleteById("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("update by id", () => {
    const result = SectorDAO.update("1", {
      name: "name",
      color: "color",
      isSuperSector: true
    });
    expect(result).toStrictEqual(returnAllExample);
  });
});

import sendIpcSql from "message-control/renderer";
import {deleteById, getById} from "./operations";

jest.mock("message-control/renderer");

const returnAllExample: string[] = [];

const mockedSendIpcSql = sendIpcSql as jest.Mock;

describe("Operations functions tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedSendIpcSql.mockImplementation(() => returnAllExample);
  });

  test("delete by id return all results", () => {
    const result = deleteById("test", "1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id element 1", () => {
    const result = getById("test","1");
    expect(result).toStrictEqual(returnAllExample);
  });


});

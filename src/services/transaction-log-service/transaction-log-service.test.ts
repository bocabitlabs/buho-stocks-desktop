import { ITransactionLogMessage, ITransactionLogMessageFormProps } from "types/transaction-log";
import Service from "./transaction-log-service";

const returnAllExample: ITransactionLogMessage[] = [
  {
    id: "1",
    creationDate: "01-01-2021",
    message: "This is a message",
    portfolioId: 1,
    type: "TEST_TYPE"
  },
  {
    id: "2",
    creationDate: "01-01-2021",
    message: "This is a message",
    portfolioId: 1,
    type: "TEST_TYPE"
  },
  {
    id: "3",
    creationDate: "01-01-2021",
    message: "This is a message",
    portfolioId: 1,
    type: "TEST_TYPE"
  }
];

jest.mock("database/daos/transaction-log-dao/transaction-log-dao", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  getByName: () => returnAllExample[2],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

describe("SectorService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = Service.getAll("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = Service.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("create", () => {
    const newElement: ITransactionLogMessageFormProps = {
      message: "This is a message",
      portfolioId: 1,
      type: "TEST_TYPE"
    };

    const result = Service.create(newElement);
    expect(result).toStrictEqual({changes: 1});
  });

});

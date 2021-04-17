import { IRightsTransaction, RightsTransactionFormProps } from "types/rights-transaction";
import Service from "./rights-transaction-service";

const returnAllExample: IRightsTransaction[] = [
  {
    id: "1",
    transactionDate: "01-01-2021",
    notes: "This is a message",
    companyId: "1",
    color: "#fff",
    commission: 0.5,
    count: 10,
    exchangeRate: 0.5,
    price: 1,
    type: "BUY",
    currencyName: "Dolar",
    currencySymbol: "$"
  },
  {
    id: "2",
    transactionDate: "01-01-2021",
    notes: "This is a message",
    companyId: "1",
    color: "#fff",
    commission: 0.5,
    count: 10,
    exchangeRate: 0.5,
    price: 2,
    type: "BUY",
    currencyName: "Dolar",
    currencySymbol: "$"
  },
  {
    id: "3",
    transactionDate: "01-01-2021",
    notes: "This is a message",
    companyId: "1",
    color: "#fff",
    commission: 0.5,
    count: 10,
    exchangeRate: 0.5,
    price: 3,
    type: "BUY",
    currencyName: "Dolar",
    currencySymbol: "$"
  }
];

jest.mock("database/daos/rights-transaction-dao/rights-transaction-dao", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));


describe("RightsTransaction Service tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = Service.getAll("1");
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get by id", () => {
    const result = Service.getById("1");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("delete by id", () => {
    const result = Service.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("export all", () => {
    const result = Service.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("create", () => {
    const newElement: RightsTransactionFormProps = {
      transactionDate: "01-01-2021",
      notes: "This is a message",
      companyId: "1",
      color: "#fff",
      commission: 0.5,
      count: 10,
      exchangeRate: 0.5,
      price: 3,
      type: "BUY",
    };

    const result = Service.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update", () => {
    const newElement: RightsTransactionFormProps = {
      transactionDate: "01-01-2021",
      notes: "This is a message",
      companyId: "1",
      color: "#fff",
      commission: 0.5,
      count: 10,
      exchangeRate: 0.5,
      price: 3,
      type: "BUY",
    };

    const result = Service.update("1", newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });
});

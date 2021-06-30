import {
  DividendsTransactionFormProps,
  IDividendsTransaction
} from "types/dividends-transaction";
import Service from "./dividends-transactions-service";

const returnAllExample: IDividendsTransaction[] = [
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
    currencyName: "Dolar",
    currencySymbol: "$"
  }
];

jest.mock(
  "database/daos/dividends-transaction-dao/dividends-transaction-dao",
  () => ({
    exportAll: () => returnAllExample,
    getAll: () => returnAllExample,
    getById: () => returnAllExample[1],
    create: () => ({ changes: 1 }),
    deleteById: () => ({ changes: 1 }),
    update: () => ({ changes: 1 })
  })
);

describe("DividendsTransaction Service tests", () => {
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
    const newElement: DividendsTransactionFormProps = {
      transactionDate: "01-01-2021",
      notes: "This is a message",
      companyId: "1",
      color: "#fff",
      commission: 0.5,
      count: 10,
      exchangeRate: 0.5,
      price: 3
    };

    const result = Service.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update", () => {
    const newElement: DividendsTransactionFormProps = {
      transactionDate: "01-01-2021",
      notes: "This is a message",
      companyId: "1",
      color: "#fff",
      commission: 0.5,
      count: 10,
      exchangeRate: 0.5,
      price: 3
    };

    const result = Service.update("1", newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });
});

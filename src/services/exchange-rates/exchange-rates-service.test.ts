import Service from "./exchange-rates-service";
import { IExchangeRate, IExchangeRateForm } from "types/exchange-rate";

const returnAllExample: IExchangeRate[] = [
  {
    id: 1,
    transactionDate: "01-01-2019",
    exchangeValue: 10,
    exchangeName: "USDEUR"
  },
  {
    id: 2,
    transactionDate: "01-01-2020",
    exchangeValue: 11,
    exchangeName: "USDEUR"
  },
  {
    id: 3,
    transactionDate: "01-01-2021",
    exchangeValue: 12,
    exchangeName: "USDEUR"
  }
];

jest.mock("database/daos/exchange-rate-dao/exchange-rate-dao", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  get: () => returnAllExample[1],
  getByName: () => returnAllExample[2],
  getLastStockPriceByCompanyId: () => returnAllExample[1],
  getLastStockPricePerYearByCompanyId: () => returnAllExample[1],
  create: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 }),
  update: () => ({ changes: 1 })
}));

jest.mock("yahoo-stock-prices-fetch", () => ({
  getCurrentData: () => jest.fn(),
  getHistoricalPrices: async () => [1, 2, 3]
}));


describe("ExchangeRate Service tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = Service.getAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("delete by id", () => {
    const result = Service.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("create", () => {
    const newElement: IExchangeRateForm = {
      transactionDate: "01-01-2021",
      exchangeValue: 12,
      exchangeName: "USDEUR"
    };
    const result = Service.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });


  test("get last stock by id", () => {
    const result = Service.get("01-02-2020", "USDEUR");
    expect(result).toStrictEqual(returnAllExample[1]);
  });
});
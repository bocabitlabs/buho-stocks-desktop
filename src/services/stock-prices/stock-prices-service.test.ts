import { IStockPrice, StockPriceFormProps } from "types/stock-price";
import Service from "./stock-prices-service";
import YahooFetch from "yahoo-stock-prices-fetch";

const returnAllExample: IStockPrice[] = [
  {
    id: "1",
    transactionDate: "01-01-2021",
    companyId: "1",
    exchangeRate: 0.5,
    price: 10
  },
  {
    id: "2",
    transactionDate: "01-01-2021",
    companyId: "1",
    exchangeRate: 0.5,
    price: 10
  },
  {
    id: "3",
    transactionDate: "01-01-2021",
    companyId: "1",
    exchangeRate: 0.5,
    price: 10
  }
];

jest.mock("database/daos/stock-price-dao/stock-price-dao", () => ({
  exportAll: () => returnAllExample,
  getAll: () => returnAllExample,
  getById: () => returnAllExample[1],
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

// jest.mock("yahoo-stock-prices-fetch", () => jest.fn());

describe("StockPrice Service tests", () => {
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
    const newElement: StockPriceFormProps = {
      transactionDate: "01-01-2021",
      companyId: "1",
      exchangeRate: 0.5,
      price: 10
    };
    const result = Service.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("exportAll returns all results", () => {
    const result = Service.exportAll();
    expect(result).toStrictEqual(returnAllExample);
  });

  test("get last stock by id", () => {
    const result = Service.getLastStockPriceByCompanyId("1");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("get last stock by id and year", () => {
    const result = Service.getLastStockPricePerYearByCompanyId("1", "2019");
    expect(result).toStrictEqual(returnAllExample[1]);
  });

  test("get stock price from API", async () => {
    const result = await Service.getStockPriceAPI("PG", "NYSE:PG");
    expect(result.found).toStrictEqual(true);
  });

  test("get historic stock price from API with start and end", async () => {
    const result = await Service.getHistoricStockPriceFromAPIStartEnd(
      "01-01-2019",
      "01-02-2019",
      "0.5"
    );
    expect(result.found).toStrictEqual(true);
  });

  test("get historic stock price from API", async () => {
    const result = await Service.getHistoricStockPriceFromAPI(
      "01-01-2019",
      "0.5"
    );
    expect(result.found).toStrictEqual(true);
  });

  test("get historic stock price from API with error", async () => {

    const mockLog = jest.spyOn(console, 'error'); //Do not pollute the logs
    mockLog.mockImplementation(() => {});

    const mockAddListener = jest.spyOn(YahooFetch, 'getCurrentData');
    mockAddListener.mockImplementation(() => {throw Error("Error")});

    const result = await Service.getStockPriceAPI("PG", "NYSE:PG");
    expect(result.found).toStrictEqual(false);
  });
});

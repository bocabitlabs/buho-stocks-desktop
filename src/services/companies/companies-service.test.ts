import Service from "./companies-service";
import { CompanyFormFields } from "types/company";

const mockExpectedReturnForGetId = {
  alternativeTickers: undefined,
  broker: undefined,
  closed: false,
  color: undefined,
  countryCode: "es",
  currencyAbbreviation: undefined,
  currencyId: undefined,
  currencyName: undefined,
  currencySymbol: undefined,
  description: "This is the description",
  dividends: {
    dividendsTransactions: []
  },
  dividendsCurrencyAbbreviation: undefined,
  dividendsCurrencyId: undefined,
  dividendsCurrencySymbol: undefined,
  dividendsTransactions: undefined,
  id: "1",
  investment: {
    rightsTransactions: [],
    sharesTransactions: []
  },
  marketId: undefined,
  name: "Good Company",
  portfolioCurrencyAbbreviation: undefined,
  portfolioCurrencySymbol: undefined,
  portfolioId: undefined,
  portfolioName: undefined,
  portfolioValue: {
    companyName: undefined,
    prices: {
      stockPrices: undefined
    },
    shares: {
      sharesTransactions: []
    }
  },
  prices: {
    stockPrices: []
  },
  returns: {
    closed: undefined,
    dividends: {
      dividendsTransactions: []
    },
    dividendsTransactions: [],
    investment: {
      rightsTransactions: [],
      sharesTransactions: []
    },
    portfolioValue: {
      companyName: undefined,
      prices: {
        stockPrices: []
      },
      shares: {
        sharesTransactions: []
      }
    },
    sharesTransactions: []
  },
  rightsTransactions: [],
  sectorId: undefined,
  sectorName: undefined,
  shares: {
    sharesTransactions: []
  },
  sharesTransactions: [],
  stockPrices: [],
  superSectorName: undefined,
  ticker: "GC",
  url: undefined
};

jest.mock("database/daos/company-dao/company-dao", () => ({
  getAll: () => [],
  exportAll: () => [],
  getByTicker: () => ({}),
  getByTickerPortfolio: () => ({}),
  getById: () => (mockExpectedReturnForGetId),
  create: () => ({ changes: 1 }),
  getFirstTransaction: () => ({}),
  update: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 })
}));

jest.mock("database/daos/shares-transaction-dao/shares-transactions-dao", () => ({
  getAll: () => [],
}));

jest.mock("database/daos/dividends-transaction-dao/dividends-transaction-dao", () => ({
  getAll: () => [],
}));

jest.mock("database/daos/rights-transaction-dao/rights-transaction-dao", () => ({
  getAll: () => [],
}));

jest.mock("services/stock-prices/stock-prices-service", () => ({
  getAll: () => [],
}));

jest.mock("yahoo-stock-prices-fetch", () => ({
  getCurrentData: () => jest.fn(),
  getHistoricalPrices: async () => [1, 2, 3]
}));

describe("CompanyService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = Service.getAll("1");
    expect(result).toStrictEqual([]);
  });

  test("exportAll return all results", () => {
    const result = Service.exportAll();
    expect(result).toStrictEqual([]);
  });

  test("getByTicker return", () => {
    const result = Service.getByTicker("IBM");
    expect(result).toStrictEqual({});
  });

  test("getByTickerAndPortfolio return", () => {
    const result = Service.getByTickerPortfolio("IBM", "1");
    expect(result).toStrictEqual({});
  });

  test("getFirstTransaction return", () => {
    const result = Service.getFirstTransaction("1");
    expect(result).toStrictEqual({});
  });

  test("getById return", () => {
    const result = Service.getById("1");
    expect(result?.ticker).toStrictEqual("GC");
    expect(result?.name).toStrictEqual("Good Company");
    expect(result?.closed).toStrictEqual(false);
  });

  test("create", () => {
    const newElement: CompanyFormFields = {
      countryCode: "es",
      name: "Good company",
      ticker: "GC",
      broker: "IN",
      closed: false,
      url: "",
      description: "Bla bla",
      currencyId: "1",
      dividendsCurrencyId: "1",
      marketId: "2",
      sectorId: "3",
      color: "#000",
      portfolioId: "1",
      alternativeTickers: ""
    };

    const result = Service.create(newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update selected portfolio", () => {
    const newElement: CompanyFormFields = {
      countryCode: "es",
      name: "Good company",
      ticker: "GC",
      broker: "IN",
      closed: false,
      url: "",
      description: "Bla bla",
      currencyId: "1",
      dividendsCurrencyId: "1",
      marketId: "2",
      sectorId: "3",
      color: "#000",
      portfolioId: "1",
      alternativeTickers: ""
    };
    const result = Service.update("2", newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("delete", () => {
    const result = Service.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });
});

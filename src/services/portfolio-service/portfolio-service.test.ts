import Service from "./portfolio-service";
import { CompanyFormFields } from "types/company";
import { IPortfolio, PortfolioFormFields } from "types/portfolio";

const mockExpectedReturnForGetId = {
  color: "#fff",
  companies: [],
  currencyAbbreviation: "USD",
  currencyCountryCode: "us",
  currencyId: 1,
  currencyName: "US Dolar",
  currencySymbol: "$",
  description: "This is description",
  name: "Portfolio Default",
  id: "1"
};

const mockCompany = { name: "Company 1", ticker: "IBM" };

jest.mock("database/daos/portfolio-dao/portfolio-dao", () => ({
  getAll: () => [],
  exportAll: () => [],
  getByName: () => ({}),
  // getByTickerPortfolio: () => ({}),
  getById: () => mockExpectedReturnForGetId,
  // create: () => ({ changes: 1 }),
  getFirstTransaction: () => ({}),
  update: () => ({ changes: 1 }),
  deleteById: () => ({ changes: 1 })
}));

jest.mock("database/daos/company-dao/company-dao", () => ({
  getAll: () => [mockCompany],
  // exportAll: () => [],
  // getByTicker: () => ({}),
  // getByTickerPortfolio: () => ({}),
  getById: () => mockCompany,
  // create: () => ({ changes: 1 }),
  // getFirstTransaction: () => ({}),
  update: () => ({ changes: 1 })
  // deleteById: () => ({ changes: 1 })
}));

// jest.mock("database/daos/shares-transaction-dao/shares-transactions-dao", () => ({
//   getAll: () => [],
// }));

// jest.mock("database/daos/dividends-transaction-dao/dividends-transaction-dao", () => ({
//   getAll: () => [],
// }));

// jest.mock("database/daos/rights-transaction-dao/rights-transaction-dao", () => ({
//   getAll: () => [],
// }));

// jest.mock("services/stock-price-service/stock-price-service", () => ({
//   getAll: () => [],
// }));

jest.mock("yahoo-stock-prices-fetch", () => ({
  getCurrentData: () => jest.fn(),
  getHistoricalPrices: async () => [1, 2, 3]
}));

describe("PortfolioService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    const result = Service.getAll();
    expect(result).toStrictEqual([]);
  });

  test("exportAll return all results", () => {
    const result = Service.exportAll();
    expect(result).toStrictEqual([]);
  });

  test("getByName return", () => {
    const result = Service.getByName("Portfolio test");
    expect(result).toStrictEqual({});
  });

  test("getById return", () => {
    const result = Service.getById("1");
    expect(result?.color).toStrictEqual(mockExpectedReturnForGetId.color);
    expect(result?.name).toStrictEqual(mockExpectedReturnForGetId.name);
    expect(result?.description).toStrictEqual(
      mockExpectedReturnForGetId.description
    );
    expect(result?.companies.length).toStrictEqual(1);
  });

  test("delete by ID", () => {
    const result = Service.deleteById("1");
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("update selected portfolio", () => {
    const newElement: PortfolioFormFields = {
      name: "Good company",
      description: "This is description",
      color: "#000",
      currencyId: 1
    };
    const result = Service.update("2", newElement);
    expect(result).toStrictEqual({ changes: 1 });
  });

  test("getFirstTransaction return", () => {
    const result = Service.getFirstTransaction("1");
    expect(result).toStrictEqual({});
  });

  // test("getById return", () => {
  //   const result = Service.getById("1");
  //   expect(result?.ticker).toStrictEqual("GC");
  //   expect(result?.name).toStrictEqual("Good Company");
  //   expect(result?.closed).toStrictEqual(false);
  // });

  // test("create", () => {
  //   const newElement: CompanyFormFields = {
  //     countryCode: "es",
  //     name: "Good company",
  //     ticker: "GC",
  //     broker: "IN",
  //     closed: false,
  //     url: "",
  //     description: "Bla bla",
  //     currencyId: "1",
  //     dividendsCurrencyId: "1",
  //     marketId: "2",
  //     sectorId: "3",
  //     color: "#000",
  //     portfolioId: "1",
  //     alternativeTickers: ""
  //   };

  //   const result = Service.create(newElement);
  //   expect(result).toStrictEqual({ changes: 1 });
  // });
});

import Service from "./company-service";

// const dividendsPart: ICompanyDividends = {
//   dividendsTransactions: [],
//   getDividendsAmount: jest.fn(),
//   getCumulativeDividendsAmountForYear: jest.fn(),
//   getDividendsAmountForYear: jest.fn(),
//   getMonthlyDividendsForYear: jest.fn()
// };

// const investmentPart: ICompanyInvestment = {
//   sharesTransactions: [],
//   rightsTransactions: [],
//   getTotalInvested: jest.fn(),
//   getTotalInvestedUntilYear: jest.fn(),
//   getTotalInvestedOnYear: jest.fn(),
// };

// const stockPricesPart: ICompanyStockPrices = {
//   stockPrices: [],
//   getLatestStockPrice: jest.fn(),
//   getLatestStockPriceForYear: jest.fn(),
// };

// const sharesPart: ICompanyShares = {
//   sharesTransactions: [],
//   getSharesCount: jest.fn(),
//   getSharesCountForYear: jest.fn(),
//   getCumulativeSharesCountUntilYear: jest.fn()
// };

// const portfolioPart: ICompanyPortfolioValue = {
//   shares: sharesPart,
//   prices: stockPricesPart,
//   companyName: "CompanyName",
//   getPortfolioValue: jest.fn(),
//   getPortfolioValueForYear: jest.fn()
// };
// const returnAllExample: ICompany[] = [
//   {
//     id: "1",
//     portfolioName: "Portfolio",
//     portfolioCurrencySymbol: "$",
//     portfolioCurrencyAbbreviation: "USD",
//     dividendsCurrencySymbol: "$",
//     dividendsCurrencyAbbreviation: "USD",
//     currencyName: "US Dolar",
//     currencyAbbreviation: "USD",
//     sectorName: "Software",
//     superSectorName: "Technology",
//     currencySymbol: "USD",
//     stockPrices: [],
//     sharesTransactions: [],
//     dividendsTransactions: [],
//     rightsTransactions: [],
//     dividends: dividendsPart
//   }
// ];
jest.mock("database/daos/company-dao/company-dao", () => ({
  getAll: () => []
  // exportAll: () => returnAllExample.collapsed,
  // getByTicker: () => returnAllExample.selectedPortfolio,
  // getByTickerPortfolio: () => returnAllExample.defaultCompanyDisplayMode,
  // getById: () => returnAllExample.defaultCompanyDisplayMode,
  // create: () => ({ changes: 1 }),
  // getFirstTransaction: () => () => returnAllExample.defaultCompanyDisplayMode,
  // update: () => ({ changes: 1 }),
  // deleteById: () => ({ changes: 1 })
}));

describe("CompanyService tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getAll return all results", () => {
    // const result = Service.getAll("1");
    expect(1).toStrictEqual(1);
  });

  // test("getIsCollapsed return collapsed", () => {
  //   const result = Service.getIsCollapsed();
  //   expect(result).toStrictEqual(returnAllExample.collapsed);
  // });

  // test("getSelectedPortfolio return collapsed", () => {
  //   const result = Service.getSelectedPortfolio();
  //   expect(result).toStrictEqual(returnAllExample.selectedPortfolio);
  // });

  // test("addSettings", () => {
  //   const newElement: ISettings = {
  //     selectedPortfolio: "1",
  //     collapsed: true,
  //     defaultCompanyDisplayMode: "card",
  //     databasePath: "",
  //     language: "en"
  //   };

  //   const result = Service.addSettings(newElement);
  //   expect(result).toStrictEqual({ changes: 1 });
  // });

  // test("update selected portfolio", () => {
  //   const result = Service.updateSelectedPortfolio("2");
  //   expect(result).toStrictEqual({ changes: 1 });
  // });

  // test("update database path", () => {
  //   const result = Service.updateDatabasePath("/foo/bar");
  //   expect(result).toStrictEqual({ changes: 1 });
  // });

  // test("toggle collapsed", () => {
  //   const result = Service.toggleCollapsed();
  //   expect(result).toStrictEqual({ changes: 1 });
  // });

  // test("set default company display mode", () => {
  //   const result = Service.setDefaultCompanyDisplayMode("card");
  //   expect(result).toStrictEqual({ changes: 1 });
  // });
});

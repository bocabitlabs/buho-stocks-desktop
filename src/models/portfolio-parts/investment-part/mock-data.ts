import { Company } from "models/company";
import { CompanyDividends } from "models/company-parts/dividends-part/company-dividends";
import { CompanyInvestment } from "models/company-parts/investment-part/company-investment";
import { CompanyPortfolioValue } from "models/company-parts/portfolio-value-part/company-portfolio-value";
import { CompanyReturns } from "models/company-parts/returns-part/company-returns";
import { CompanyShares } from "models/company-parts/shares-part/company-shares";
import { CompanyStockPrices } from "models/company-parts/stock-prices-part/company-stock-prices";
import { ICompany } from "types/company";
import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";

// const dividendsTransactions: IDividendsTransaction[] = [
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2019-01-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2020-01-02",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2021-03-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2021-04-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   }
// ];

// let companyDividends = new CompanyDividends(dividendsTransactions);

// const sharesTransactions: ISharesTransaction[] = [
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2019-01-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "BUY",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2020-01-02",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "BUY",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2021-03-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "SELL",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2021-04-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "BUY",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   }
// ];

// let companyShares = new CompanyShares(sharesTransactions);

// const rightsTransactions: IRightsTransaction[] = [
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2019-01-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "BUY",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2020-01-02",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "BUY",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2021-03-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "SELL",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   },
//   {
//     id: "1",
//     count: 10,
//     price: 1,
//     commission: 1,
//     companyId: "1",
//     transactionDate: "2021-04-01",
//     color: "#FFF",
//     exchangeRate: 0.5,
//     notes: "These are the notes",
//     type: "BUY",
//     currencyName: "Dollar",
//     currencySymbol: "$"
//   }
// ];

// let companyInvestment = new CompanyInvestment(
//   sharesTransactions,
//   rightsTransactions
// );

// const prices: IStockPrice[] = [
//   {
//     id: "1",
//     price: 1,
//     companyId: "1",
//     transactionDate: "2019-01-01",
//     exchangeRate: 0.5
//   },
//   {
//     id: "1",
//     price: 3,
//     companyId: "1",
//     transactionDate: "2020-05-02",
//     exchangeRate: 0.5
//   },
//   {
//     id: "1",
//     price: 2,
//     companyId: "1",
//     transactionDate: "2020-01-02",
//     exchangeRate: 0.5
//   },
//   {
//     id: "1",
//     price: 3,
//     companyId: "1",
//     transactionDate: "2021-03-01",
//     exchangeRate: 0.5
//   },
//   {
//     id: "1",
//     price: 4,
//     companyId: "1",
//     transactionDate: "2021-04-01",
//     exchangeRate: 0.5
//   }
// ];

// let companyStockPrices = new CompanyStockPrices(prices);

// let companyValue = new CompanyPortfolioValue(
//   "Example Company",
//   companyStockPrices,
//   companyShares
// );

// let companyReturns = new CompanyReturns(
//   false,
//   sharesTransactions,
//   dividendsTransactions,
//   companyInvestment,
//   companyDividends,
//   companyValue
// );

// export const company1 = new Company(
//   {
//     id: "1",
//     countryCode: "us",
//     currencyName: "dolar",
//     sectorName: "tech",
//     currencySymbol: "$",
//     sharesTransactions: [],
//     dividendsTransactions: [],
//     rightsTransactions: [],
//     stockPrices: [],
//     name: "Mocrosoft",
//     ticker: "MOSFT",
//     url: "https://mosoft.local",
//     description: "Tech company",
//     portfolioName: "Portfolio1",
//     portfolioCurrencySymbol: "€",
//     alternativeTickers: "",
//     broker: "IM",
//     closed: false,
//     color: "#fff",
//     currencyAbbreviation: "usd",
//     currencyId: "1",
//     marketId: "1",
//     dividendsCurrencyId: "1",
//     dividends: companyDividends,
//     dividendsCurrencyAbbreviation: "usd",
//     dividendsCurrencySymbol: "$",
//     investment: companyInvestment,
//     portfolioId: "1",
//     portfolioCurrencyAbbreviation: "eur",
//     portfolioValue: companyValue,
//     prices: companyStockPrices,
//     returns: companyReturns,
//     superSectorName: "Tech",
//     shares: companyShares,
//     sectorId: "1",
//     // getRpd: (value) => 5,
//     // getYoc: (value) => 5
//   }
// );

// export const company2 = new Company(
//   {
//     id: "2",
//     countryCode: "us",
//     currencyName: "dolar",
//     sectorName: "tech",
//     currencySymbol: "$",
//     sharesTransactions: [],
//     dividendsTransactions: [],
//     rightsTransactions: [],
//     stockPrices: [],
//     name: "Gurgle",
//     ticker: "GOOL",
//     url: "https://gool.local",
//     description: "Tech company",
//     portfolioName: "Portfolio1",
//     portfolioCurrencySymbol: "€",
//     alternativeTickers: "",
//     broker: "IM",
//     closed: false,
//     color: "#fff",
//     currencyAbbreviation: "usd",
//     currencyId: "1",
//     marketId: "1",
//     dividendsCurrencyId: "1",
//     dividends: companyDividends,
//     dividendsCurrencyAbbreviation: "usd",
//     dividendsCurrencySymbol: "$",
//     investment: companyInvestment,
//     portfolioId: "1",
//     portfolioCurrencyAbbreviation: "eur",
//     portfolioValue: companyValue,
//     prices: companyStockPrices,
//     returns: companyReturns,
//     superSectorName: "Tech",
//     shares: companyShares,
//     sectorId: "1",
//     getRpd: (value) => 5,
//     getYoc: (value) => 5
//   }
// );

// module.exports = {
//   companyDividends,
//   companyShares,
//   companyInvestment,
//   companyStockPrices,
//   companyValue,
//   companyReturns
// };

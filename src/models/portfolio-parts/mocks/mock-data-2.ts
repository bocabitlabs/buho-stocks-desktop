import { Company } from "models/company";
import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";

const dividendsTransactions: IDividendsTransaction[] = [
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2019-01-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2020-01-02",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2021-03-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2021-04-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    currencyName: "Dollar",
    currencySymbol: "$"
  }
];

const sharesTransactions: ISharesTransaction[] = [
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2019-01-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "BUY",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2020-01-02",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "BUY",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2021-03-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "SELL",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2021-04-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "BUY",
    currencyName: "Dollar",
    currencySymbol: "$"
  }
];

const rightsTransactions: IRightsTransaction[] = [
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2019-01-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "BUY",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2020-01-02",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "BUY",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2021-03-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "SELL",
    currencyName: "Dollar",
    currencySymbol: "$"
  },
  {
    id: "2",
    count: 10,
    price: 1,
    commission: 1,
    companyId: "1",
    transactionDate: "2021-04-01",
    color: "#FFF",
    exchangeRate: 0.5,
    notes: "These are the notes",
    type: "BUY",
    currencyName: "Dollar",
    currencySymbol: "$"
  }
];

const stockPrices: IStockPrice[] = [
  {
    id: "2",
    price: 1,
    companyId: "1",
    transactionDate: "2019-01-01",
    exchangeRate: 0.5
  },
  {
    id: "2",
    price: 3,
    companyId: "1",
    transactionDate: "2020-05-02",
    exchangeRate: 0.5
  },
  {
    id: "2",
    price: 2,
    companyId: "1",
    transactionDate: "2020-01-02",
    exchangeRate: 0.5
  },
  {
    id: "2",
    price: 3,
    companyId: "1",
    transactionDate: "2021-03-01",
    exchangeRate: 0.5
  },
  {
    id: "2",
    price: 4,
    companyId: "1",
    transactionDate: "2021-04-01",
    exchangeRate: 0.5
  }
];

export const company2 = new Company(
  {
    id: "2",
    countryCode: "us",
    currencyName: "dolar",
    sectorName: "tech",
    currencySymbol: "$",
    sharesTransactions,
    dividendsTransactions,
    rightsTransactions,
    stockPrices,
    name: "Gurgle",
    ticker: "GOOL",
    url: "https://gool.local",
    description: "Tech company",
    portfolioName: "Portfolio1",
    portfolioCurrencySymbol: "€",
    alternativeTickers: "",
    broker: "IM",
    closed: false,
    color: "#fff",
    currencyAbbreviation: "usd",
    currencyId: "1",
    marketId: "1",
    dividendsCurrencyId: "1",
    dividendsCurrencyAbbreviation: "usd",
    dividendsCurrencySymbol: "$",
    portfolioId: "1",
    portfolioCurrencyAbbreviation: "eur",
    superSectorName: "Tech",
    sectorId: "1",
  }
);

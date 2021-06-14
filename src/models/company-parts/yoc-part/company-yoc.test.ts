import { ICompanyYoc } from "types/company-parts/yoc-part/yoc-part";
import { IDividendsTransaction } from "types/dividends-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyYoc } from "./company-yoc";

describe("Company YOC tests", () => {
  const sharesTransactions: ISharesTransaction[] = [
    {
      id: "1",
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
      id: "1",
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
      id: "1",
      count: 10,
      price: 1,
      commission: 1,
      companyId: "1",
      transactionDate: "2021-03-01",
      color: "#FFF",
      exchangeRate: 0.5,
      notes: "These are the notes",
      type: "BUY",
      currencyName: "Dollar",
      currencySymbol: "$"
    }
  ];

  const dividendsTransactions: IDividendsTransaction[] = [
    {
      id: "1",
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
      id: "1",
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
      id: "1",
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
    }
  ];

  let rightsTransactions: ISharesTransaction[] = [
    {
      id: "1",
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
      id: "1",
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
      id: "1",
      count: 10,
      price: 1,
      commission: 1,
      companyId: "1",
      transactionDate: "2021-03-01",
      color: "#FFF",
      exchangeRate: 0.5,
      notes: "These are the notes",
      type: "BUY",
      currencyName: "Dollar",
      currencySymbol: "$"
    }
  ];

  const prices: IStockPrice[] = [
    {
      id: "1",
      price: 1,
      companyId: "1",
      transactionDate: "2019-01-01",
      exchangeRate: 0.5
    },
    {
      id: "1",
      price: 3,
      companyId: "1",
      transactionDate: "2020-05-02",
      exchangeRate: 0.5
    },
    {
      id: "1",
      price: 2,
      companyId: "1",
      transactionDate: "2020-01-02",
      exchangeRate: 0.5
    },
    {
      id: "1",
      price: 3,
      companyId: "1",
      transactionDate: "2021-03-01",
      exchangeRate: 0.5
    },
    {
      id: "1",
      price: 4,
      companyId: "1",
      transactionDate: "2021-04-01",
      exchangeRate: 0.5
    }
  ];

  let companyYoc: ICompanyYoc | null = null;

  beforeEach(() => {
    jest.resetAllMocks();

    companyYoc = new CompanyYoc(
      "Example Company",
      dividendsTransactions,
      sharesTransactions,
      prices,
    );
  });

  test("get yoc", () => {
    // 30 value * 4 = 120
    // 30 dividends - 3 commission = 27
    expect(companyYoc?.getYoc()).toStrictEqual((27/120)*100);
  });

  test("get yoc in portfolio currency", () => {
    // 30 value * 4 = 60 (120 * 0.5)
    // 30 dividends - 3 commission = 13.5 (27 * 0.5)
    expect(companyYoc?.getYoc(true)).toStrictEqual((13.5/60)*100);
  });
});

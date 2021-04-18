import { ICompanyPortfolioValue } from "types/company-parts/portfolio-value/portfolio-value-part";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyShares } from "../shares-part/company-shares";
import { CompanyStockPrices } from "../stock-prices-part/company-stock-prices";
import { CompanyPortfolioValue } from "./company-portfolio-value";

describe("Company Portfolio Value tests", () => {
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
      type: "SELL",
      currencyName: "Dollar",
      currencySymbol: "$"
    },
    {
      id: "1",
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

  let companyValue: ICompanyPortfolioValue | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    const companyStockPrices = new CompanyStockPrices(prices);
    const companyShares = new CompanyShares(sharesTransactions);

    companyValue = new CompanyPortfolioValue(
      "Example Company",
      companyStockPrices,
      companyShares
    );
  });

  test("get the portfolio value", () => {
    // 20 * 4
    expect(companyValue?.getPortfolioValue()).toStrictEqual(80);
  });

  test("get the portfolio value in portfolio currency", () => {
    // 20 * 4 / 2
    expect(companyValue?.getPortfolioValue(true)).toStrictEqual(40);
  });

  test("get the portfolio value for 2019", () => {
    const year = 2019;
    expect(
      companyValue?.getPortfolioValueForYear(year.toString())
    ).toStrictEqual(10);
  });

  test("get the portfolio value for 2019 in portfolio currency", () => {
    const year = 2019;
    expect(
      companyValue?.getPortfolioValueForYear(year.toString(), true)
    ).toStrictEqual(5);
  });

  test("get the portfolio value for 2020", () => {
    const year = 2020;
    expect(
      companyValue?.getPortfolioValueForYear(year.toString())
    ).toStrictEqual(60);
  });

  test("get the portfolio value for 2020 in portfolio currency", () => {
    const year = 2020;
    expect(
      companyValue?.getPortfolioValueForYear(year.toString(), true)
    ).toStrictEqual(30);
  });

  test("get the portfolio value for 2021", () => {
    const year = 2021;
    expect(
      companyValue?.getPortfolioValueForYear(year.toString())
    ).toStrictEqual(80);
  });
});

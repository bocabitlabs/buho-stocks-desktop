import { ICompanyStockPrices } from "types/company-parts/stock-prices-part/stock-prices-part";
import { IStockPrice } from "types/stock-price";
import { CompanyStockPrices } from "./company-stock-prices";

describe("Company Stock prices tests", () => {
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
  let companyStockPrices: ICompanyStockPrices | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    companyStockPrices = new CompanyStockPrices(prices);
  });

  test("get latest stock price", () => {
    const expectedResult = {
      companyId: "1",
      exchangeRate: 0.5,
      id: "1",
      price: 4,
      transactionDate: "2021-04-01"
    };
    expect(companyStockPrices?.getLatestStockPrice()).toStrictEqual(
      expectedResult
    );
  });

  test("get latest stock price for 2019", () => {
    const expectedResult = {
      id: "1",
      price: 1,
      companyId: "1",
      transactionDate: "2019-01-01",
      exchangeRate: 0.5
    };
    const year = 2019;
    expect(
      companyStockPrices?.getLatestStockPriceForYear(year.toString())
    ).toStrictEqual(expectedResult);
  });

  test("get latest stock price for 2020", () => {
    const expectedResult = {
      id: "1",
      price: 3,
      companyId: "1",
      transactionDate: "2020-05-02",
      exchangeRate: 0.5
    };
    const year = 2020;
    expect(
      companyStockPrices?.getLatestStockPriceForYear(year.toString())
    ).toStrictEqual(expectedResult);
  });

  test("get latest stock price for 2021", () => {
    const expectedResult = {
      id: "1",
      price: 4,
      companyId: "1",
      transactionDate: "2021-04-01",
      exchangeRate: 0.5
    };
    const year = 2021;
    expect(
      companyStockPrices?.getLatestStockPriceForYear(year.toString())
    ).toStrictEqual(expectedResult);
  });
});

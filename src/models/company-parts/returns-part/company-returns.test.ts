import { ICompanyReturns } from "types/company-parts/returns-part/returns-part";
import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyReturns } from "./company-returns";

describe("Company Returns tests", () => {
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
  const prices: IStockPrice[] = [
    {
      id: "1",
      price: 2,
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
      price: 4,
      companyId: "1",
      transactionDate: "2021-04-01",
      exchangeRate: 0.5
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

  const rightsTransactions: IRightsTransaction[] = [];
  let companyReturns: ICompanyReturns | null = null;

  beforeEach(() => {
    jest.resetAllMocks();

    companyReturns = new CompanyReturns(
      false,
      "Example company",
      dividendsTransactions,
      rightsTransactions,
      sharesTransactions,
      prices
    );
  });

  test("get return", () => {
    // 120 (4*30) - 33 (investment)
    expect(companyReturns?.getReturn()).toStrictEqual(87);
  });

  test("get the return for 2019", () => {
    // 20 * 4
    const year = 2019;
    // 20 - 11
    expect(companyReturns?.getReturnForYear(year.toString())).toStrictEqual(
      20 - 11
    );
  });

  test("get the return for 2020", () => {
    const year = 2020;
    // 60 (3*20) - (20 +11))
    expect(companyReturns?.getReturnForYear(year.toString())).toStrictEqual(
      60 - (20 + 11)
    );
  });

  test("get the return for 2021", () => {
    const year = 2021;
    // 60 (4*30) - (20 +11))
    expect(companyReturns?.getReturnForYear(year.toString())).toStrictEqual(
      120 - (60 + 11)
    );
  });
});

describe("Company Portfolio Value tests with sales", () => {
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
      transactionDate: "2020-06-02",
      color: "#FFF",
      exchangeRate: 0.5,
      notes: "These are the notes",
      type: "SELL",
      currencyName: "Dollar",
      currencySymbol: "$"
    }
  ];
  const prices: IStockPrice[] = [
    {
      id: "1",
      price: 2,
      companyId: "1",
      transactionDate: "2019-01-01",
      exchangeRate: 0.5
    },
    {
      id: "1",
      price: 3,
      companyId: "1",
      transactionDate: "2020-07-02",
      exchangeRate: 0.5
    }
  ];

  const dividendsTransactions: IDividendsTransaction[] = [];
  const rightsTransactions: IRightsTransaction[] = [];
  let companyReturns: ICompanyReturns | null = null;

  beforeEach(() => {
    jest.resetAllMocks();

    companyReturns = new CompanyReturns(
      false,
      "Example company",
      dividendsTransactions,
      rightsTransactions,
      sharesTransactions,
      prices
    );
  });

  test("get return with one sale", () => {
    // 120 (3*10) - 22 (investment)
    expect(companyReturns?.getReturn()).toStrictEqual(30 - 22);
  });

  test("get return with one sale in portfolio currency", () => {
    // 120 (3*10) - 22 (investment)
    expect(companyReturns?.getReturn(true)).toStrictEqual(4);
  });

  test("get the return for 2019 with one sale", () => {
    const year = 2019;
    // 20 - 11
    expect(companyReturns?.getReturnForYear(year.toString())).toStrictEqual(
      20 - 11
    );
  });

  test("get the return for 2019 with one sale in portfolio currency", () => {
    const year = 2019;
    // 20 - 11
    expect(
      companyReturns?.getReturnForYear(year.toString(), true)
    ).toStrictEqual(4.5);
  });

  test("get the return for 2020 with one sale", () => {
    const year = 2020;
    // portfolio value current year - portfolio value previous year + invested current year
    // 60 (3*10) - (20 +11))
    expect(companyReturns?.getReturnForYear(year.toString())).toStrictEqual(-1);
  });

  test("get return from sales", () => {
    // 0 + 10 * 1 * 1 - (1 * 1)
    // accum + (count * price * exchangeRate - (commission * exchangeRate))
    expect(companyReturns?.getReturnFromSales()).toStrictEqual(9);
  });

  test("get return from sales in portfolio currency", () => {
    // 0 + 10 * 1 * 1 - (1 * 1)
    // accum + (count * price * exchangeRate - (commission * exchangeRate))
    expect(companyReturns?.getReturnFromSales(true)).toStrictEqual(4.5);
  });

  test("get return from sales on 2019", () => {
    // accum + (count * price * exchangeRate - (commission * exchangeRate))
    const year = 2019;
    expect(
      companyReturns?.getReturnFromSalesForYear(year.toString())
    ).toStrictEqual(0);
  });

  test("get return from sales on 2019 in portfolio currency", () => {
    // accum + (count * price * exchangeRate - (commission * exchangeRate))
    const year = 2019;
    expect(
      companyReturns?.getReturnFromSalesForYear(year.toString(), true)
    ).toStrictEqual(0);
  });

  test("get return from sales on 2020", () => {
    const year = 2020;
    expect(
      companyReturns?.getReturnFromSalesForYear(year.toString())
    ).toStrictEqual(9);
  });

  test("get return from sales on 2020 in portfolio currency", () => {
    const year = 2020;
    expect(
      companyReturns?.getReturnFromSalesForYear(year.toString(), true)
    ).toStrictEqual(4.5);
  });
});

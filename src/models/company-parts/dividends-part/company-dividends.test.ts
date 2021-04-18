import { ICompanyDividends } from "types/company-parts/dividends-part/dividends-part";
import { IDividendsTransaction } from "types/dividends-transaction";
import { CompanyDividends } from "./company-dividends";

describe("Company Dividends tests", () => {

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
      currencyName: "Dollar",
      currencySymbol: "$"
    }
  ];
  let companyDividends: ICompanyDividends|null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    companyDividends = new CompanyDividends(dividendsTransactions);
  });

  test("get the dividends amount", () => {
    // 40 - 4
    expect(companyDividends?.getDividendsAmount()).toStrictEqual(36);
  });

  test("get the dividends amount in portfolio currency", () => {
    // 40 - 4
    expect(companyDividends?.getDividendsAmount(true)).toStrictEqual(18);
  });

  test("get the dividends amount without commission", () => {
    // 40 - 4
    expect(companyDividends?.getDividendsAmount(false, false)).toStrictEqual(40);
  });

  test("get the dividends amount in portfolio currency without commission", () => {
    // 40 - 4
    expect(companyDividends?.getDividendsAmount(true, false)).toStrictEqual(20);
  });

  // test("get the dividends amount for year", () => {
  //   // 40 - 4
  //   const year = 2019;
  //   expect(companyDividends?.getDividendsAmountForYear(year.toString())).toStrictEqual(36);
  // });
});
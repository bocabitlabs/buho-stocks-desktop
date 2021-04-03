// const returnAllExample: Inflation[] = [
//   { id: "1", year: 2019, percentage: 5 },
//   { id: "2", year: 2020, percentage: 2 },
//   { id: "3", year: 2021, percentage: 4 }
// ];

import { ICompanyShares } from "types/company";
import { SharesTransaction } from "types/shares-transaction";
import { TransactionType } from "types/transaction";
import { CompanyShares } from "./company-shares";

// jest.mock("database/daos/inflation-dao", () => ({
//   getAll: () => returnAllExample,
//   getInflationsForYear: () => returnAllExample,
//   addInflation: () => ({changes: 1}),
//   deleteById: () => ({changes: 1})
// }));

describe("Company Shares tests", () => {

  const sharesTransactions: SharesTransaction[] = [
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
      type: TransactionType.BUY,
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
      type: TransactionType.BUY,
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
      type: TransactionType.SELL,
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
      type: TransactionType.BUY,
      currencyName: "Dollar",
      currencySymbol: "$"
    }
  ];
  let companyShares: ICompanyShares|null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    companyShares = new CompanyShares(sharesTransactions);
  });

  test("get the shares count", () => {
    expect(companyShares?.getSharesCount()).toStrictEqual(20);
  });

  test("get the shares count for 2019", () => {
    const year = 2019;
    expect(companyShares?.getSharesCountForYear(year.toString())).toStrictEqual(10);
  });

  test("get the shares count for 2020", () => {
    const year = 2020;
    expect(companyShares?.getSharesCountForYear(year.toString())).toStrictEqual(10);
  });

  test("get the shares count for 2021", () => {
    const year = 2021;
    expect(companyShares?.getSharesCountForYear(year.toString())).toStrictEqual(0);
  });

  test("get accumulated shares count for 2019", () => {
    const year = 2019;
    expect(companyShares?.getCumulativeSharesCountUntilYear(year.toString())).toStrictEqual(10);
  });

  test("get accumulated shares count for 2020", () => {
    const year = 2020;
    expect(companyShares?.getCumulativeSharesCountUntilYear(year.toString())).toStrictEqual(20);
  });

  test("get accumulated shares count for 2021", () => {
    const year = 2021;
    expect(companyShares?.getCumulativeSharesCountUntilYear(year.toString())).toStrictEqual(20);
  });

  test("get accumulated shares count for 2022", () => {
    const year = 2022;
    expect(companyShares?.getCumulativeSharesCountUntilYear(year.toString())).toStrictEqual(20);
  });
});

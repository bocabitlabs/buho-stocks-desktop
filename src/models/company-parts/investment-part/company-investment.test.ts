import { ICompanyInvestment } from "types/company-parts/investment-part/investment-part";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { CompanyInvestment } from "./company-investment";

describe("Company Investment tests", () => {
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
  const rightsTransactions: IRightsTransaction[] = [
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
  let companyInvestment: ICompanyInvestment | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    companyInvestment = new CompanyInvestment(
      sharesTransactions,
      rightsTransactions
    );
  });

  test("get total invested", () => {
    // 33 + 33
    expect(companyInvestment?.getTotalInvested()).toStrictEqual(66);
  });

  test("get total invested in portfolio currency", () => {
    expect(companyInvestment?.getTotalInvested(true)).toStrictEqual(33);
  });

  test("get total invested on year 2019", () => {
    const year = 2019;
    expect(companyInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(22);
  });

  test("get total invested on year 2020", () => {
    const year = 2020;
    expect(companyInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(22);
  });

  test("get total invested on year 2021", () => {
    const year = 2021;
    expect(companyInvestment?.getTotalInvestedOnYear(year.toString())).toStrictEqual(33);
  });

  test("get total invested on year 2019 in portfolio currency", () => {
    const year = 2019;
    expect(companyInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(11);
  });

  test("get total invested on year 2020 in portfolio currency", () => {
    const year = 2020;
    expect(companyInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(11);
  });

  test("get total invested on year 2021 in portfolio currency", () => {
    const year = 2021;
    expect(companyInvestment?.getTotalInvestedOnYear(year.toString(), true)).toStrictEqual(16.5);
  });

  test("get total invested until year 2019", () => {
    const year = 2019;
    expect(companyInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(22);
  });

  test("get total invested until year 2020", () => {
    const year = 2020;
    expect(companyInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(44);
  });

  test("get total invested until year 2021", () => {
    const year = 2021;
    expect(companyInvestment?.getTotalInvestedUntilYear(year.toString())).toStrictEqual(77);
  });

  test("get total invested until year 2019 in portfolio currency", () => {
    const year = 2019;
    expect(companyInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(11);
  });

  test("get total invested until year 2020 in portfolio currency", () => {
    const year = 2020;
    expect(companyInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(22);
  });

  test("get total invested until year 2021 in portfolio currency", () => {
    const year = 2021;
    expect(companyInvestment?.getTotalInvestedUntilYear(year.toString(), true)).toStrictEqual(38.5);
  });
});

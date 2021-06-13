import { ICompanyRpd } from "types/company-parts/rpd-part/rpd-part";
import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { CompanyRpd } from "./rpd-part";

describe("Company RPD tests", () => {
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
  let companyRpd: ICompanyRpd | null = null;

  beforeEach(() => {
    jest.resetAllMocks();

    companyRpd = new CompanyRpd(
      dividendsTransactions,
      [],
      sharesTransactions,
    );
  });

  test("get rpd", () => {
    // 30 invested +  3 commission = 33
    // 30 dividends - 3 commission = 27
    expect(companyRpd?.getRpd()).toStrictEqual((27/33)*100);
  });

  test("get rpd with some rights", () => {
    // 30 invested +  3 commission = 33 (shares)
    // 30 invested +  3 commission = 33 (rights)
    // 30 dividends - 3 commission = 27
    companyRpd = new CompanyRpd(
      dividendsTransactions,
      rightsTransactions,
      sharesTransactions,
    );
    expect(companyRpd?.getRpd()).toStrictEqual((27/66)*100);
  });

});

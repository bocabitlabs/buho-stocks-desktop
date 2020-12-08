import { YearlyShareFields } from "../../../../types/share";
import { YearlyOperationsDictProps } from "../table-logic";
import { setYearlySharesAttributes } from "./yearly-shares-logic";


const year2017: YearlyShareFields = {
  year: "2017",
  companyId: "1",
  sharesBought: 10,
  sharesSold: 5,
  investedAmount: 100,
  investedAmountBaseCurrency: 90,
  soldAmount: 50,
  soldAmountBaseCurrency: 40,
  investmentCommission: 2,
  sellCommission: 3,
  operationsCount: 2
};

const year2018: YearlyShareFields = {
  year: "2018",
  companyId: "1",
  sharesBought: 10,
  sharesSold: 5,
  investedAmount: 100,
  investedAmountBaseCurrency: 90,
  soldAmount: 50,
  soldAmountBaseCurrency: 40,
  investmentCommission: 4,
  sellCommission: 3,
  operationsCount: 2
};

const year2021: YearlyShareFields = {
  year: "2021",
  companyId: "1",
  sharesBought: 10,
  sharesSold: 5,
  investedAmount: 200,
  investedAmountBaseCurrency: 190,
  soldAmount: 100,
  soldAmountBaseCurrency: 40,
  investmentCommission: 5,
  sellCommission: 3,
  operationsCount: 2
};

describe("setYearlySharesAttributes tests", () => {
  test("Empty share results", () => {
    const originYearlyShares: YearlyShareFields[] = [];
    const result = setYearlySharesAttributes(originYearlyShares);
    expect(result).toStrictEqual({});
  });

  test("Has expected output one year", () => {
    const expectedResult: any = {
      "2017": year2017
    };
    expectedResult["2017"].averagePrice = 10;
    expectedResult["2017"].ivestmentWithCommission = 102;

    const originYearlyShares: YearlyShareFields[] = [year2017];
    const result = setYearlySharesAttributes(originYearlyShares);
    expect(result).toStrictEqual(expectedResult);
  });

  test("Has expected output with two years as input", () => {
    const expectedResult: any = {
      "2017": year2017,
      "2018": year2018
    };

    // 100 / 10 = 10 -> investedAmount / sharesBought
    expectedResult["2017"].averagePrice = 10;
    // 100 + 5 = 105 -> investedAmount + investmentCommission
    expectedResult["2017"].ivestmentWithCommission = 102;

    expectedResult["2018"].averagePrice = 10;
    expectedResult["2018"].ivestmentWithCommission = 104;

    const sharesResults: YearlyShareFields[] = [year2017, year2018];
    const yearsDict = setYearlySharesAttributes(sharesResults);
    expect(yearsDict).toStrictEqual(expectedResult);
  });

  test("Has expected output with three years as input", () => {
    const expectedResult: any = {
      "2021": year2021,
      "2017": year2017,
      "2018": year2018
    };
    expectedResult["2017"].averagePrice = 10;
    expectedResult["2017"].ivestmentWithCommission = 102;

    expectedResult["2018"].averagePrice = 10;
    expectedResult["2018"].ivestmentWithCommission = 104;

    expectedResult["2021"].averagePrice = 20;
    expectedResult["2021"].ivestmentWithCommission = 205;

    const sharesResults: YearlyShareFields[] = [year2017, year2018, year2021];
    const yearsDict = setYearlySharesAttributes(sharesResults);
    expect(yearsDict).toStrictEqual(expectedResult);
  });
});

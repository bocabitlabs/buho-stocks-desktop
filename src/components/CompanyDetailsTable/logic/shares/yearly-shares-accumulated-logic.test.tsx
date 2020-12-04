import {
  YearlyOperationsDictProps
} from "../table-logic";
import { YearlyShareFields } from "../../../../types/share";
import { YearlyOperationsFields } from "../../../../types/company";
import { setYearlySharesAttributes } from "./yearly-shares-logic";
import { setAccumulatedYearlySharesAttributes } from "./yearly-shares-accumulated-logic";

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

describe("setAccumulatedYearlySharesAttributes tests", () => {

  test("Has expected accumulatedInvestmentCommission value for 3 years", () => {
    const expectedResult: any = {
      "2021": year2021,
      "2017": year2017,
      "2018": year2018
    };
    expectedResult["2017"].averagePrice = 10;
    expectedResult["2017"].totalInvestedWithCommission = 102;

    expectedResult["2018"].averagePrice = 10;
    expectedResult["2018"].totalInvestedWithCommission = 104;

    expectedResult["2021"].averagePrice = 20;
    expectedResult["2021"].totalInvestedWithCommission = 205;

    const sharesResults: YearlyShareFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlySharesAttributes(sharesResults, originYears);
    yearsDict = setAccumulatedYearlySharesAttributes(sharesResults, yearsDict);
    // expect(yearsDict).toStrictEqual(expectedResult);
    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 2 -> Investment commission
    expect(element2017.accumulatedInvestmentCommission).toBe(2);
    // 2 + 4
    expect(element2018.accumulatedInvestmentCommission).toBe(6);
    // 2 + 4 + 5
    expect(element2021.accumulatedInvestmentCommission).toBe(11);

  });

  test("Has expected accumulatedInvestment value for 3 years", () => {
    const expectedResult: any = {
      "2021": year2021,
      "2017": year2017,
      "2018": year2018
    };
    expectedResult["2017"].averagePrice = 10;
    expectedResult["2017"].totalInvestedWithCommission = 102;

    expectedResult["2018"].averagePrice = 10;
    expectedResult["2018"].totalInvestedWithCommission = 104;

    expectedResult["2021"].averagePrice = 20;
    expectedResult["2021"].totalInvestedWithCommission = 205;

    const sharesResults: YearlyShareFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlySharesAttributes(sharesResults, originYears);
    yearsDict = setAccumulatedYearlySharesAttributes(sharesResults, yearsDict);
    // expect(yearsDict).toStrictEqual(expectedResult);
    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 100 -> Invested amount
    expect(element2017.accumulatedInvestment).toBe(100);
    // 100 + 100
    expect(element2018.accumulatedInvestment).toBe(200);
    // 100 + 100 + 200
    expect(element2021.accumulatedInvestment).toBe(400);

  });

  test("Has expected accumulatedSharesNumber value for 3 years", () => {
    const expectedResult: any = {
      "2021": year2021,
      "2017": year2017,
      "2018": year2018
    };
    expectedResult["2017"].averagePrice = 10;
    expectedResult["2017"].totalInvestedWithCommission = 102;

    expectedResult["2018"].averagePrice = 10;
    expectedResult["2018"].totalInvestedWithCommission = 104;

    expectedResult["2021"].averagePrice = 20;
    expectedResult["2021"].totalInvestedWithCommission = 205;

    const sharesResults: YearlyShareFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlySharesAttributes(sharesResults, originYears);
    yearsDict = setAccumulatedYearlySharesAttributes(sharesResults, yearsDict);
    // expect(yearsDict).toStrictEqual(expectedResult);
    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 10 - 5 -> boughtShares - soldShares
    expect(element2017.accumulatedSharesNumber).toBe(5);
    // 100 + 100
    expect(element2018.accumulatedSharesNumber).toBe(10);
    // 100 + 100 + 200
    expect(element2021.accumulatedSharesNumber).toBe(15);
  });

  test("Has expected accumulatedSellCommission value for 3 years", () => {
    const expectedResult: any = {
      "2021": year2021,
      "2017": year2017,
      "2018": year2018
    };
    expectedResult["2017"].averagePrice = 10;
    expectedResult["2017"].totalInvestedWithCommission = 102;

    expectedResult["2018"].averagePrice = 10;
    expectedResult["2018"].totalInvestedWithCommission = 104;

    expectedResult["2021"].averagePrice = 20;
    expectedResult["2021"].totalInvestedWithCommission = 205;

    const sharesResults: YearlyShareFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlySharesAttributes(sharesResults, originYears);
    yearsDict = setAccumulatedYearlySharesAttributes(sharesResults, yearsDict);
    // expect(yearsDict).toStrictEqual(expectedResult);
    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 3 -> sellCommission
    expect(element2017.accumulatedSellCommission).toBe(3);
    // 6
    expect(element2018.accumulatedSellCommission).toBe(6);
    // 9
    expect(element2021.accumulatedSellCommission).toBe(9);
  });

  test("Has expected accumulatedSoldAmount value for 3 years", () => {
    const expectedResult: any = {
      "2021": year2021,
      "2017": year2017,
      "2018": year2018
    };
    expectedResult["2017"].averagePrice = 10;
    expectedResult["2017"].totalInvestedWithCommission = 102;

    expectedResult["2018"].averagePrice = 10;
    expectedResult["2018"].totalInvestedWithCommission = 104;

    expectedResult["2021"].averagePrice = 20;
    expectedResult["2021"].totalInvestedWithCommission = 205;

    const sharesResults: YearlyShareFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlySharesAttributes(sharesResults, originYears);
    yearsDict = setAccumulatedYearlySharesAttributes(sharesResults, yearsDict);
    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 50 -> sellCommission
    expect(element2017.accumulatedSoldAmount).toBe(50);
    // 50 + 50 = 100
    expect(element2018.accumulatedSoldAmount).toBe(100);
    // 50 + 50 + 100 = 200
    expect(element2021.accumulatedSoldAmount).toBe(200);
  });


});

import { YearlyOperationsFields } from "../../../types/company";
import { YearlyDividendFields } from "../../../types/dividend";
import {
  YearlyOperationsDictProps,
  setYearlyDividendsAttributes,
  setAccumulatedYearlyDividendsAttributes
} from "./table-logic";

const year2017: YearlyDividendFields = {
  year: "2017",
  companyId: "1",
  sharesNumber: 10,
  dividendsGross: 100,
  dividendsGrossBaseCurrency: 90,
  dividendsNet: 95,
  dividendsNetBaseCurrency: 90,
  dividendsCommission: 5
};

const year2018: YearlyDividendFields = {
  year: "2018",
  companyId: "1",
  sharesNumber: 10,
  dividendsGross: 100,
  dividendsGrossBaseCurrency: 90,
  dividendsNet: 95,
  dividendsNetBaseCurrency: 90,
  dividendsCommission: 5
};

const year2021: YearlyDividendFields = {
  year: "2021",
  companyId: "1",
  sharesNumber: 20,
  dividendsGross: 2000,
  dividendsGrossBaseCurrency: 900,
  dividendsNet: 1950,
  dividendsNetBaseCurrency: 900,
  dividendsCommission: 50
};

describe("setYearlyDividendsAttributes tests", () => {
  test("Empty share results", () => {
    const originYearlyShares: YearlyDividendFields[] = [];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    yearsDict = setAccumulatedYearlyDividendsAttributes(originYearlyShares, yearsDict);
    expect(yearsDict).toStrictEqual({});
  });

  test("Has expected accumulatedDividendsGross for three years", () => {
    const expectedResult: any = {
      "2017": year2017,
      "2018": year2018,
      "2021": year2021
    };
    expectedResult["2017"].dividendsPerShare = 10;
    expectedResult["2018"].dividendsPerShare = 10;
    expectedResult["2021"].dividendsPerShare = 100;

    const originYearlyShares: YearlyDividendFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    yearsDict = setAccumulatedYearlyDividendsAttributes(originYearlyShares, yearsDict);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;
    // 100 -> accumulatedDividendsGross
    expect(element2017.accumulatedDividendsGross).toBe(100);
    // 100 + 100
    expect(element2018.accumulatedDividendsGross).toBe(200);
    // 100 + 100 + 2000
    expect(element2021.accumulatedDividendsGross).toBe(2200);

  });

  test("Has expected accumulatedDividendsGrossBaseCurrency for three years", () => {
    const expectedResult: any = {
      "2017": year2017,
      "2018": year2018,
      "2021": year2021
    };
    expectedResult["2017"].dividendsPerShare = 10;
    expectedResult["2018"].dividendsPerShare = 10;
    expectedResult["2021"].dividendsPerShare = 100;

    const originYearlyShares: YearlyDividendFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    yearsDict = setAccumulatedYearlyDividendsAttributes(originYearlyShares, yearsDict);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 90 -> accumulatedDividendsGross
    expect(element2017.accumulatedDividendsGrossBaseCurrency).toBe(90);
    // 90 + 90
    expect(element2018.accumulatedDividendsGrossBaseCurrency).toBe(180);
    // 90 + 90 + 900
    expect(element2021.accumulatedDividendsGrossBaseCurrency).toBe(1080);

  });

  test("Has expected accumulatedDividendsNet for three years", () => {
    const expectedResult: any = {
      "2017": year2017,
      "2018": year2018,
      "2021": year2021
    };
    expectedResult["2017"].dividendsPerShare = 10;
    expectedResult["2018"].dividendsPerShare = 10;
    expectedResult["2021"].dividendsPerShare = 100;

    const originYearlyShares: YearlyDividendFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    yearsDict = setAccumulatedYearlyDividendsAttributes(originYearlyShares, yearsDict);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 95 -> accumulatedDividendsGross
    expect(element2017.accumulatedDividendsNet).toBe(95);
    // 95 + 95
    expect(element2018.accumulatedDividendsNet).toBe(190);
    // 95 + 95 + 1950
    expect(element2021.accumulatedDividendsNet).toBe(2140);

      /**
    +     "accumulatedDividendsNetBaseCurrency": 90,
       */
  });

  test("Has expected accumulatedDividendsGrossBaseCurrency for three years", () => {
    const expectedResult: any = {
      "2017": year2017,
      "2018": year2018,
      "2021": year2021
    };
    expectedResult["2017"].dividendsPerShare = 10;
    expectedResult["2018"].dividendsPerShare = 10;
    expectedResult["2021"].dividendsPerShare = 100;

    const originYearlyShares: YearlyDividendFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    yearsDict = setAccumulatedYearlyDividendsAttributes(originYearlyShares, yearsDict);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 90 -> accumulatedDividendsGross
    expect(element2017.accumulatedDividendsGrossBaseCurrency).toBe(90);
    // 90 + 90
    expect(element2018.accumulatedDividendsGrossBaseCurrency).toBe(180);
    // 90 + 90 + 900
    expect(element2021.accumulatedDividendsGrossBaseCurrency).toBe(1080);

  });

  test("Has expected accumulatedDividendsNetBaseCurrency for three years", () => {
    const expectedResult: any = {
      "2017": year2017,
      "2018": year2018,
      "2021": year2021
    };
    expectedResult["2017"].dividendsPerShare = 10;
    expectedResult["2018"].dividendsPerShare = 10;
    expectedResult["2021"].dividendsPerShare = 100;

    const originYearlyShares: YearlyDividendFields[] = [year2017, year2018, year2021];
    let originYears: YearlyOperationsDictProps = {};
    let yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    yearsDict = setAccumulatedYearlyDividendsAttributes(originYearlyShares, yearsDict);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;

    // 90 -> accumulatedDividendsGross
    expect(element2017.accumulatedDividendsNetBaseCurrency).toBe(90);
    // 90 + 90
    expect(element2018.accumulatedDividendsNetBaseCurrency).toBe(180);
    // 90 + 90 + 900
    expect(element2021.accumulatedDividendsNetBaseCurrency).toBe(1080);

  });
});

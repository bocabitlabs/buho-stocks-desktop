import { YearlyOperationsFields } from "../../../types/company";
import { YearlyDividendFields } from "../../../types/dividend";
import {
  YearlyOperationsDictProps,
  setYearlyDividendsAttributes
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
    const result = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    expect(result).toStrictEqual({});
  });

  test("Has expected output one year", () => {
    const expectedResult: any = {
      "2017": year2017
    };
    expectedResult["2017"].dividendsPerShare = 10;

    const originYearlyShares: YearlyDividendFields[] = [year2017];
    let originYears: YearlyOperationsDictProps = {};
    const yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    expect(yearsDict).toStrictEqual(expectedResult);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;

    expect(
      element2017.dividendsGross - element2017.dividendsCommission
    ).toBe(element2017.dividendsNet);
  });

  test("Has expected output two years", () => {
    const expectedResult: any = {
      "2017": year2017,
      "2018": year2018
    };
    expectedResult["2017"].dividendsPerShare = 10;
    expectedResult["2018"].dividendsPerShare = 10;

    const originYearlyShares: YearlyDividendFields[] = [year2017, year2018];
    let originYears: YearlyOperationsDictProps = {};
    const yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    expect(yearsDict).toStrictEqual(expectedResult);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;

    expect(
      element2017.dividendsGross - element2017.dividendsCommission
    ).toBe(element2017.dividendsNet);

    expect(
      element2018.dividendsGross - element2018.dividendsCommission
    ).toBe(element2018.dividendsNet);
  });

  test("Has expected output three years", () => {
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
    const yearsDict = setYearlyDividendsAttributes(
      originYearlyShares,
      originYears
    );
    expect(yearsDict).toStrictEqual(expectedResult);

    const element2017 = yearsDict["2017"] as YearlyOperationsFields;
    const element2018 = yearsDict["2018"] as YearlyOperationsFields;
    const element2021 = yearsDict["2021"] as YearlyOperationsFields;


    expect(
      element2017.dividendsGross - element2017.dividendsCommission
    ).toBe(element2017.dividendsNet);

    expect(
      element2018.dividendsGross - element2018.dividendsCommission
    ).toBe(element2018.dividendsNet);

    expect(
      element2021.dividendsGross - element2021.dividendsCommission
    ).toBe(element2021.dividendsNet);
  });
});

import { mocked } from "ts-jest/utils";
import InflationService from "../../../../services/inflation/inflation-service";
import { YearlyOperationsDictProps } from "../table-logic";
import { calculateInflationForYear } from "./inflation-logic";

describe("calculateInflationForYear tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Empty share results", () => {
    // const originYearlyShares: YearlyDividendFields[] = [];
    let originYears: YearlyOperationsDictProps = {};

    InflationService.getInflationsForYear = jest.fn().mockReturnValue([]);
    expect(InflationService.getInflationsForYear.mock).toBeTruthy();

    const result = calculateInflationForYear(originYears, "2020");

    expect(result.accumulatedInflation).toEqual(0);
  });

  test("Two years of inflation with no input", () => {
    // const originYearlyShares: YearlyDividendFields[] = [];
    const yearsWithData = [
      { year: 2019, percentage: 5 },
      { year: 2020, percentage: 2 },
      { year: 2021, percentage: 4 }
    ];

    let originYears: YearlyOperationsDictProps = {};
    InflationService.getInflationsForYear = jest
      .fn()
      .mockReturnValue(yearsWithData);
    expect(InflationService.getInflationsForYear.mock).toBeTruthy();

    const result = calculateInflationForYear(originYears, "2020");

    expect(result.accumulatedInflation).toEqual(0.07100000000000001);
  });

  test("Two years of inflation with input", () => {
    // const originYearlyShares: YearlyDividendFields[] = [];
    const yearsWithData = [
      { year: 2019, percentage: 5 },
      { year: 2020, percentage: 2 },
      { year: 2021, percentage: 4 }
    ];

    let originYears: YearlyOperationsDictProps = {
      "2019": {
        companyId: "1",
        sharesNumber: 10,
        dividendsGross: 100,
        dividendsGrossBaseCurrency: 90,
        dividendsNet: 95,
        dividendsNetBaseCurrency: 90,
        dividendsCommission: 5
      },
      "2021": {
        companyId: "1",
        sharesNumber: 10,
        dividendsGross: 100,
        dividendsGrossBaseCurrency: 90,
        dividendsNet: 95,
        dividendsNetBaseCurrency: 90,
        dividendsCommission: 5
      }
    };
    InflationService.getInflationsForYear = jest
      .fn()
      .mockReturnValue(yearsWithData);
    expect(InflationService.getInflationsForYear.mock).toBeTruthy();

    const result = calculateInflationForYear(originYears, "2019");

    expect(result.accumulatedInflation).toEqual(0.05);
  });

  test("Two years of inflation with input", () => {
    // const originYearlyShares: YearlyDividendFields[] = [];
    const yearsWithData = [
      { year: 2019, percentage: 5 },
      { year: 2020, percentage: 2 },
      { year: 2021, percentage: 4 }
    ];

    let originYears: YearlyOperationsDictProps = {
      "2019": {
        companyId: "1",
        sharesNumber: 10,
        dividendsGross: 100,
        dividendsGrossBaseCurrency: 90,
        dividendsNet: 95,
        dividendsNetBaseCurrency: 90,
        dividendsCommission: 5
      },
      "2021": {
        companyId: "1",
        sharesNumber: 10,
        dividendsGross: 100,
        dividendsGrossBaseCurrency: 90,
        dividendsNet: 95,
        dividendsNetBaseCurrency: 90,
        dividendsCommission: 5
      }
    };
    InflationService.getInflationsForYear = jest
      .fn()
      .mockReturnValue(yearsWithData);
    expect(InflationService.getInflationsForYear.mock).toBeTruthy();

    const result = calculateInflationForYear(originYears, "2021");

    expect(result.accumulatedInflation).toEqual(0.11384);
  });
});

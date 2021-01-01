import { mocked } from "ts-jest/utils";
import InflationService from "services/inflation/inflation-service";
import { YearlyOperationsDictProps } from "../table-logic";
import { calculateInflationForYear } from "./inflation-logic";

const mockedInflationService = mocked(InflationService, true)

const yearsWithData = [
  { year: 2019, percentage: 5 },
  { year: 2020, percentage: 2 },
  { year: 2021, percentage: 4 }
];

describe("calculateInflationForYear tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Empty share results", () => {
    mockedInflationService.getInflationsForYear = jest.fn().mockReturnValue([]);
    expect(mockedInflationService.getInflationsForYear.mock).toBeTruthy();

    const result = calculateInflationForYear("2020");

    expect(result).toEqual(0);
  });

  test("Two years of inflation with no input for 2020", () => {
    mockedInflationService.getInflationsForYear =  jest.fn().mockReturnValue(yearsWithData);
    expect(mockedInflationService.getInflationsForYear.mock).toBeTruthy();
    const result = calculateInflationForYear("2020");
    expect(result).toEqual(0.07100000000000001);
  });

  test("Two years of inflation with input", () => {
    mockedInflationService.getInflationsForYear = jest
      .fn()
      .mockReturnValue(yearsWithData);
    expect(mockedInflationService.getInflationsForYear.mock).toBeTruthy();

    const result = calculateInflationForYear("2019");

    expect(result).toEqual(0.05);
  });

  test("Two years of inflation with input for 2021", () => {
    InflationService.getInflationsForYear = jest
      .fn()
      .mockReturnValue(yearsWithData);
    expect(mockedInflationService.getInflationsForYear.mock).toBeTruthy();
    const result = calculateInflationForYear("2021");
    expect(result).toEqual(0.11384);
  });
});

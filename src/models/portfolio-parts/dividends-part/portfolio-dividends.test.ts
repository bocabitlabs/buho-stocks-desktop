import { IPortfolioDividends } from "types/portfolio-parts/dividends-part/dividends-part";
import { company1 } from "../mocks/mock-data-1";
import { company2 } from "../mocks/mock-data-2";
// import {company1, company2} from "./mock-data"
import { PortfolioDividends } from "./portfolio-dividends";

describe("Portfolio Dividends tests", () => {
  let portfolioDividends: IPortfolioDividends | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    portfolioDividends = new PortfolioDividends([company1, company2]);
  });

  test("get total dividends one company", () => {
    // 40 - 4
    portfolioDividends = new PortfolioDividends([company1]);
    expect(portfolioDividends?.getDividends()).toStrictEqual(36);
  });

  test("get total dividends two companies", () => {
    // 40  + 40 - 4 - 4
    expect(portfolioDividends?.getDividends()).toStrictEqual(72);
  });

  test("get dividends for year 2019", () => {
    // 40  + 40 - 4 - 4
    const year = "2019";
    expect(portfolioDividends?.getDividendsForYear(year)).toStrictEqual(18);
  });

  test("get dividends for year 2020", () => {
    const year = "2020";
    expect(portfolioDividends?.getDividendsForYear(year)).toStrictEqual(18);
  });

  test("get dividends until year 2019", () => {
    const year = "2019";
    expect(
      portfolioDividends?.getCumulativeDividendsForYear(year)
    ).toStrictEqual(18);
  });

  test("get dividends until year 2020", () => {
    const year = "2020";
    expect(
      portfolioDividends?.getCumulativeDividendsForYear(year)
    ).toStrictEqual(36);
  });

  test("get dividends until year 2021", () => {
    const year = "2021";
    expect(
      portfolioDividends?.getCumulativeDividendsForYear(year)
    ).toStrictEqual(72);
  });

  test("get monthly dividends for year 2019", () => {
    const year = "2019";
    expect(portfolioDividends?.getMonthlyDividendsForYear(year)).toStrictEqual(
      1.5
    );
  });
  test("get monthly dividends for year 2020", () => {
    const year = "2020";
    expect(portfolioDividends?.getMonthlyDividendsForYear(year)).toStrictEqual(
      1.5
    );
  });
  test("get monthly dividends for year 2021", () => {
    const year = "2021";
    expect(portfolioDividends?.getMonthlyDividendsForYear(year)).toStrictEqual(
      3
    );
  });
});

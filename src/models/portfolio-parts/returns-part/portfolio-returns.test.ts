import { IPortfolioInvestments } from "types/portfolio-parts/investments-part/investment-part";
import { IPortfolioReturns } from "types/portfolio-parts/returns-part/returns-part";
import { company1 } from "../mocks/mock-data-1";
import { company2 } from "../mocks/mock-data-2";
import { PortfolioReturns } from "./portfolio-returns";

describe("Portfolio Returns tests", () => {
  let portfolioReturns: IPortfolioReturns | null = null;

  beforeEach(() => {
    jest.resetAllMocks();
    portfolioReturns = new PortfolioReturns([company1, company2]);
  });

  test("get returns for year 2019", () => {
    // Total return for 2019: totalInvested= 44 portfolioValue=20. Result: -24
    const year = "2019";
    expect(portfolioReturns?.getReturnForYear(year)).toStrictEqual(-24);
  });

  test("get returns for year 2020", () => {
    // Total return for 2020: totalInvested= 88 portfolioValue=120. Result: 32
    const year = "2020";
    expect(portfolioReturns?.getReturnForYear(year)).toStrictEqual(32);
  });

  test("get returns for year 2020 in base currency", () => {
    // Total return for 2020: totalInvested= 88 portfolioValue=120. Result: 32
    const year = "2020";
    const usePortfolioCurrency = true;
    expect(portfolioReturns?.getReturnForYear(year, usePortfolioCurrency)).toStrictEqual(16);
  });

  test("get returns for year 2021", () => {
    // Total return for 2021: totalInvested= 154 portfolioValue=160. Result: 24
    const year = "2021";
    expect(portfolioReturns?.getReturnForYear(year)).toStrictEqual(24);
  });

  test("get returns percentage for year 2019", () => {
    const year = "2019";
    expect(portfolioReturns?.getReturnPercentageForYear(year)).toStrictEqual(
      -54.54545454545454
    );
  });

  test("get returns percentage for year 2020", () => {
    const year = "2020";
    expect(portfolioReturns?.getReturnPercentageForYear(year)).toStrictEqual(
      87.5
    );
  });

  test("get returns percentage for year 2021", () => {
    const year = "2021";
    expect(portfolioReturns?.getReturnPercentageForYear(year)).toStrictEqual(
      -13.978494623655912
    );
  });

  test("get returns percentage cumulative for year 2019", () => {
    const year = "2019";
    expect(
      portfolioReturns?.getReturnPercentageCumulativeForYear(year)
    ).toStrictEqual(-54.54545454545454);
  });

  test("get returns percentage cumulative for year 2020", () => {
    const year = "2020";
    expect(
      portfolioReturns?.getReturnPercentageCumulativeForYear(year)
    ).toStrictEqual(36.36363636363637);
  });

  test("get returns percentage cumulative for year 2021", () => {
    const year = "2021";
    expect(
      portfolioReturns?.getReturnPercentageCumulativeForYear(year)
    ).toStrictEqual(3.896103896103896);
  });

  test("get returns with dividends", () => {
    expect(portfolioReturns?.getReturnWithDividends()).toStrictEqual(118);
  });

  test("get returns with dividends in portfolio currency", () => {
    const usePortfolioCurrency = true;
    expect(portfolioReturns?.getReturnWithDividends(usePortfolioCurrency)).toStrictEqual(59);
  });

  test("get return with dividends for year 2019", () => {
    const year = "2019";
    expect(portfolioReturns?.getReturnWithDividendsForYear(year)).toStrictEqual(
      -6
    );
  });

  test("get return with dividends for year 2020", () => {
    const year = "2020";
    expect(portfolioReturns?.getReturnWithDividendsForYear(year)).toStrictEqual(
      68
    );
  });

  test("get return with dividends for year 2021", () => {
    const year = "2021";
    expect(portfolioReturns?.getReturnWithDividendsForYear(year)).toStrictEqual(
      96
    );
  });

  test("get return with dividends percentage", () => {
    expect(portfolioReturns?.getReturnWithDividendsPercentage()).toStrictEqual(
      89.39393939393939
    );
  });

  test("get return percentage with dividends cummulative for year 2019", () => {
    const year = "2019";
    expect(
      portfolioReturns?.getReturnPercentageWithDividendsForYearCumulative(year)
    ).toStrictEqual(-13.636363636363635);
  });

  test("get return percentage with dividends cummulative for year 2020", () => {
    const year = "2020";
    expect(
      portfolioReturns?.getReturnPercentageWithDividendsForYearCumulative(year)
    ).toStrictEqual(77.27272727272727);
  });

  test("get return percentage with dividends cummulative for year 2021", () => {
    const year = "2021";
    expect(
      portfolioReturns?.getReturnPercentageWithDividendsForYearCumulative(year)
    ).toStrictEqual(50.649350649350644);
  });

  test("get return percentage", () => {
    expect(
      portfolioReturns?.getReturnPercentage()
    ).toStrictEqual(34.84848484848485);
  });
});

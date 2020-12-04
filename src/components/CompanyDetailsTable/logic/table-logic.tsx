import { YearlyOperationsFields } from "../../../types/company";
import { YearlyDividendFields } from "../../../types/dividend";
import { YearlyShareFields } from "../../../types/share";
import { setAccumulatedYearlyDividendsAttributes } from "./dividends/yearly-dividends-accumulated-logic";
import { setYearlyDividendsAttributes } from "./dividends/yearly-dividends-logic";
import { calculateInflationForYears } from "./inflation/inflation-logic";
import { calculatePortfolioReturns } from "./returns/returns-logic";
import { setAccumulatedYearlySharesAttributes } from "./shares/yearly-shares-accumulated-logic";
import { setYearlySharesAttributes } from "./shares/yearly-shares-logic";
import { calculatePortfolioValueWithStockPrices } from "./stock-prices/stock-prices-logic";



export interface YearlyOperationsDictProps {
  [year: string]: YearlyOperationsFields | {};
}

export const computeYearlyData = (
  yearlyShares: YearlyShareFields[] | [],
  yearlyDividends: YearlyDividendFields[] | []
) => {
  let years: YearlyOperationsDictProps = {};

  // Every year of operations
  if (yearlyShares.length > 0) {
    // There are operations
    years = setYearlySharesAttributes(yearlyShares, years);
    // Calculate the accumulated values for yearly shares
    years = setAccumulatedYearlySharesAttributes(yearlyShares, years);
  }

  if (yearlyDividends.length > 0) {
    // There are dividends
    years = setYearlyDividendsAttributes(yearlyDividends, years);
    // Accumulated values for dividends
    years = setAccumulatedYearlyDividendsAttributes(yearlyDividends, years);
  }

  years = calculateInflationForYears(years);
  years = calculatePortfolioValueWithStockPrices(years);
  years = calculatePortfolioReturns(years);

  let resultArray: YearlyOperationsFields[] = [];
  for (var year in years) {
    const currentYearElement = years[year] as YearlyOperationsFields;
    resultArray.push(currentYearElement);
  }

  return resultArray;
};

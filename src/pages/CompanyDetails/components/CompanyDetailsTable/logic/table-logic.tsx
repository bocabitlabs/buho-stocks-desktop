import { YearlyOperationsFields } from "types/company";
import { YearlyDividendFields } from "types/dividends-transaction";
import { YearlyShareFields } from "types/shares-transaction";
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
  // Every year of operations
  // There are operations
  let modifiedYears = setYearlySharesAttributes(yearlyShares);
  // Calculate the accumulated values for yearly shares
  modifiedYears = setAccumulatedYearlySharesAttributes(modifiedYears);

  // There are dividends
  modifiedYears = setYearlyDividendsAttributes(yearlyDividends, modifiedYears);
  // Accumulated values for dividends
  modifiedYears = setAccumulatedYearlyDividendsAttributes(
    yearlyDividends,
    modifiedYears
  );

  modifiedYears = calculateInflationForYears(modifiedYears);
  modifiedYears = calculatePortfolioValueWithStockPrices(modifiedYears);
  modifiedYears = calculatePortfolioReturns(modifiedYears);

  // Convert from Dict to Array
  let resultArray: YearlyOperationsFields[] = [];
  for (var year in modifiedYears) {
    const currentYearElement = modifiedYears[year] as YearlyOperationsFields;
    resultArray.push(currentYearElement);
  }

  return resultArray;
};

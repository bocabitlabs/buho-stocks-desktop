import { PortfolioYearlyProps } from "../../../types/company";

export interface YearlyTotalDictProps {
  [year: string]: PortfolioYearlyProps | {};
}

/**
 * Get all the accumulated values for all the years
 * @param modifiedYears
 */
export function setAccumulatedAttributes(
  modifiedYears: YearlyTotalDictProps
): YearlyTotalDictProps {
  Object.entries(modifiedYears).forEach(([year, currentValues]) => {
    const currentYear = currentValues as PortfolioYearlyProps;
    Object.entries(modifiedYears).forEach(([year2, currentValues2]) => {
      const secondaryYear = currentValues2 as PortfolioYearlyProps;
      if (parseInt(year2) <= parseInt(year)) {
        // Shares number
        setAccumulatedShares(secondaryYear, currentYear);
      }
    });
  });

  return modifiedYears;
}
function setAccumulatedShares(secondaryYear: PortfolioYearlyProps, currentYear: PortfolioYearlyProps) {
  if (secondaryYear.sharesBought === undefined) {
    secondaryYear.sharesBought = 0;
  }
  if (secondaryYear.sharesSold === undefined) {
    secondaryYear.sharesSold = 0;
  }
  if (currentYear.accumulatedSharesNumber === undefined) {
    currentYear.accumulatedSharesNumber = 0;
  }
  currentYear.accumulatedSharesNumber += secondaryYear.sharesNumber;
}


import {
  PortfolioYearlyProps,
  YearlyTotalDictProps
} from "../../../types/company";

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
        // Investment
        setAccumulatedInvestment(secondaryYear, currentYear);
      }
    });
  });

  return modifiedYears;
}

function setAccumulatedShares(
  secondaryYear: PortfolioYearlyProps,
  currentYear: PortfolioYearlyProps
) {
  if (currentYear.accumulatedSharesNumber === undefined) {
    currentYear.accumulatedSharesNumber = 0;
  }
  currentYear.accumulatedSharesNumber += secondaryYear.sharesNumber;
}

function setAccumulatedInvestment(
  secondaryYear: PortfolioYearlyProps,
  currentYear: PortfolioYearlyProps
) {
  if (secondaryYear.investedWithCommission === undefined) {
    secondaryYear.investedWithCommission = 0;
  }

  if (currentYear.accumulatedInvestmentWithCommission === undefined) {
    currentYear.accumulatedInvestmentWithCommission = 0;
  }
  currentYear.accumulatedInvestmentWithCommission +=
    secondaryYear.investedWithCommission;
}

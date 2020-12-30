import { PortfolioYearlyProps } from "../../../types/company";

export function setDividendsAttributes(
  currentYear: PortfolioYearlyProps,
  yearData: PortfolioYearlyProps
) {
  // Dividends ammount
  currentYear.dividendsGross = yearData.dividendsGross;
  // Dividends Net ammount
  currentYear.dividendsNet = yearData.dividendsNet;
  // Dividends per share
  currentYear.dividendsPerShare =
    currentYear.dividendsGross / currentYear.accumulatedSharesNumber;
}

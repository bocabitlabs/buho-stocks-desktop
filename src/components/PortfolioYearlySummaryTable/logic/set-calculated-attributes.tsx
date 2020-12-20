import { PortfolioYearlyProps } from "../../../types/company";

export function setCalculatedAttributes(
  currentYear: PortfolioYearlyProps,
  yearData: PortfolioYearlyProps
) {
  currentYear.portfolioId = yearData.portfolioId;
  // Number of shares
  currentYear.sharesNumber = yearData.sharesBought - yearData.sharesSold;
  // Investment with Commission
  currentYear.investedWithCommission =
    (yearData.buyTotal || 0) -
    (yearData.sellTotal || 0) +
    (yearData.buyCommission || 0) +
    (yearData.sellCommission || 0);
  // Commission
  currentYear.commission =
    (yearData.buyCommission || 0) + (yearData.sellCommission || 0);
}

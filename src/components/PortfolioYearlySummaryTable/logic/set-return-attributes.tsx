import CompanyService from "../../../services/company-service";
import StockPriceService from "../../../services/stock-price-service";
import {
  PortfolioYearlyProps,
  YearlyTotalDictProps
} from "../../../types/company";
import { getCurrentYearReturn } from "../../CompanyDetailsTable/logic/returns/returns-logic";

export function setReturnAttributes(
  modifiedYears: YearlyTotalDictProps
): YearlyTotalDictProps {
  Object.entries(modifiedYears).forEach(([year, currentValues]) => {
    const currentYear = currentValues as PortfolioYearlyProps;

    console.log(`Calculating return for year ${currentYear.year}`);
    console.log(
      `previousYearPortfolioValueWithInflation = ${currentYear.previousYearPortfolioValueWithInflation}`
    );
    console.log(currentYear);
    // = portfolio value with inflation - (previous year's portfolio value with inflation + new investment)
    const yearReturn = getCurrentYearReturn(
      currentYear.portfolioValueWithInflation,
      currentYear.investedWithCommission,
      currentYear.previousYearPortfolioValueWithInflation
    );
    currentYear.yearReturn = yearReturn;
    currentYear.accumulatedReturn =
      currentYear.portfolioValueWithInflation -
      currentYear.accumulatedInvestmentWithCommission;

    currentYear.returnWithDividends =
      currentYear.accumulatedReturn + currentYear.dividendsNet;

  });

  return modifiedYears;
}

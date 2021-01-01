import { calculateInflationForYear } from "routes/CompanyDetails/components/CompanyDetailsTable/logic/inflation/inflation-logic";
import { getPortfolioValue } from "routes/CompanyDetails/components/CompanyDetailsTable/logic/stock-prices/stock-prices-logic";
import CompanyService from "services/company-service";
import StockPriceService from "services/stock-price-service";
import {
  PortfolioYearlyProps,
  YearlyTotalDictProps
} from "types/company";

export function setPortfolioValueAttributes(
  modifiedYears: YearlyTotalDictProps
): YearlyTotalDictProps {
  let previousYearPortfolioValueWithInflation = 0;
  let previousYearPortfolioValue = 0;
  let previousYearNetDividends = 0;

  let companyPortfolioValue = 0;

  // Iterate all the portfolio years
  Object.entries(modifiedYears).forEach(([year, currentValues]) => {
    const currentYear = currentValues as PortfolioYearlyProps;
    // For each year, get the companies in the portfolio
    const companies = new CompanyService().getCompaniesFromPortfolio(
      currentYear.portfolioId
    );
    // Initialize the portfolio value
    if (isNaN(currentYear.portfolioValue)) {
      currentYear.portfolioValue = 0;
    }
    companyPortfolioValue = 0;

    // Iterate all companies in the portfolio
    companies.forEach((company: any) => {
      // Obtain the accumulated shares and the stock price for a given year
      const accumulatedShares = new CompanyService().getAccumulatedShares(
        company.id,
        year
      );
      const latestYearStockPrice = new StockPriceService().getLastStockPricePerYearByCompanyId(
        company.id,
        year
      );
      if (accumulatedShares && latestYearStockPrice) {
        companyPortfolioValue += getPortfolioValue(
          accumulatedShares.shares,
          latestYearStockPrice.priceShare
        );
      }
    });

    currentYear.portfolioValue += companyPortfolioValue;

    const accumulatedInflation = calculateInflationForYear(year);

    currentYear.portfolioValueWithInflation =
      currentYear.portfolioValue / (1 + accumulatedInflation);

    // Set previous year value
    currentYear.previousYearPortfolioValueWithInflation = previousYearPortfolioValueWithInflation;

    currentYear.yearlyReturnPercentage =
      ((currentYear.portfolioValue -
        (previousYearPortfolioValue + currentYear.investedWithCommission)) /
        (previousYearPortfolioValue + currentYear.investedWithCommission)) *
      100;

    currentYear.accumulatedReturnPercentage =
      ((currentYear.portfolioValue -
        currentYear.accumulatedInvestmentWithCommission) /
        currentYear.accumulatedInvestmentWithCommission) *
      100;

    currentYear.returnWithDividendPercentage =
      ((currentYear.portfolioValue +
        (currentYear.dividendsNet + previousYearNetDividends) -
        currentYear.accumulatedInvestmentWithCommission) /
        currentYear.accumulatedInvestmentWithCommission) *
      100;

    currentYear.returnPerDividend =
      (currentYear.dividendsGross / currentYear.portfolioValue) * 100;

    currentYear.returnPerDividendNet =
      (currentYear.dividendsNet / currentYear.portfolioValue) * 100;

    currentYear.yoc =
      (currentYear.dividendsGross /
        currentYear.accumulatedInvestmentWithCommission) *
      100;

    // Set previous year values
    previousYearPortfolioValueWithInflation =
      currentYear.portfolioValueWithInflation;
    previousYearPortfolioValue = companyPortfolioValue;
    previousYearNetDividends = currentYear.dividendsNet;
  });

  return modifiedYears;
}

import CompanyService from "../../../services/company-service";
import StockPriceService from "../../../services/stock-price-service";
import {
  PortfolioYearlyProps,
  YearlyTotalDictProps
} from "../../../types/company";
import { calculateInflationForYear } from "../../CompanyDetailsTable/logic/inflation/inflation-logic";
import { getPortfolioValue } from "../../CompanyDetailsTable/logic/stock-prices/stock-prices-logic";

export function setPortfolioValueAttributes(
  modifiedYears: YearlyTotalDictProps
): YearlyTotalDictProps {
  Object.entries(modifiedYears).forEach(([year, currentValues]) => {
    const currentYear = currentValues as PortfolioYearlyProps;
    const companies = new CompanyService().getCompaniesFromPortfolio(
      currentYear.portfolioId
    );

    companies.forEach((company: any) => {
      const accumulatedShares = new CompanyService().getAccumulatedShares(
        company.id,
        year
      );
      const latestYearStockPrice = new StockPriceService().getLastStockPricePerYearByCompanyId(
        company.id,
        year
      );

      const portfolioValue = getPortfolioValue(
        accumulatedShares.shares,
        latestYearStockPrice.priceShare
      );

      currentYear.portfolioValue = portfolioValue;

      const accumulatedInflation = calculateInflationForYear(year);

      currentYear.portfolioValueWithInflation =
      currentYear.portfolioValue /
      (1 + accumulatedInflation);

    });

    // Object.entries(modifiedYears).forEach(([year2, currentValues2]) => {
    //   const secondaryYear = currentValues2 as PortfolioYearlyProps;
    //   if (parseInt(year2) <= parseInt(year)) {
    // Shares number
    // Get companies from portfolio (portfolioId)
    // For each company
    // getPortfolioValueByCompanyAndyear(companyId, year)
    // // const latestYearStockPrice = new StockPriceService().getLastStockPricePerYearByCompanyId(
    //   currentYearElement.companyId,
    //   year
    // );
    /*
           getAccumulatedSharesNumber(companyId, year)
           portfolioValue = getPortfolioValue(
            currentYearElement.accumulatedSharesNumber,
            latestYearStockPrice.priceShare
          );
        */

    //   }
    // });
  });

  return modifiedYears;
}

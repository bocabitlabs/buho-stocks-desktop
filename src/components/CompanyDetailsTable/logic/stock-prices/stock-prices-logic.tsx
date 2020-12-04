import StockPriceService from "../../../../services/stock-price-service";
import { YearlyOperationsFields } from "../../../../types/company";
import { YearlyOperationsDictProps } from "../table-logic";

export function calculatePortfolioValueWithStockPrices(
  yearlyOperationsDict: YearlyOperationsDictProps
) {
  for (let year in yearlyOperationsDict) {
    const currentYearElement = yearlyOperationsDict[year] as YearlyOperationsFields;
    const latestYearStockPrice = new StockPriceService().getLastStockPricePerYearByCompanyId(
      currentYearElement.companyId,
      year
    );
    console.log(latestYearStockPrice);
    currentYearElement.latestYearStockPrice = latestYearStockPrice.priceShare;
    console.log(currentYearElement.sharesSold);
    console.log(currentYearElement.latestYearStockPrice);
    currentYearElement.portfolioValue = currentYearElement.accumulatedSharesNumber
       *
      latestYearStockPrice.priceShare;
    console.log(currentYearElement.portfolioValue);
    // Q6/(1+'Resumen Anual'!I5) Portfolio Value with inflation
    currentYearElement.portfolioValueInflation =
      currentYearElement.portfolioValue /
      (1 + currentYearElement.accumulatedInflation);
  }
  return yearlyOperationsDict;
}
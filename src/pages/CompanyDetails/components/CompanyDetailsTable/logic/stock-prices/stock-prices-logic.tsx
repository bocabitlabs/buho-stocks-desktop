import StockPriceService from "services/stock-price-service";
import { YearlyOperationsFields } from "types/company";
import { YearlyOperationsDictProps } from "../table-logic";

export function calculatePortfolioValueWithStockPrices(
  yearlyOperationsDict: YearlyOperationsDictProps
) {
  for (let year in yearlyOperationsDict) {
    const currentYearElement = yearlyOperationsDict[
      year
    ] as YearlyOperationsFields;
    const latestYearStockPrice = StockPriceService.getLastStockPricePerYearByCompanyId(
      currentYearElement.companyId,
      year
    );
    let portfolioValue = 0;

    if (latestYearStockPrice) {
      currentYearElement.latestYearStockPrice = latestYearStockPrice.priceShare;
      console.log("CHECK PORTFOLIO VALUE");
      console.log(
        currentYearElement.accumulatedSharesNumber *
          latestYearStockPrice.priceShare
      );

      portfolioValue = getPortfolioValue(
        currentYearElement.accumulatedSharesNumber,
        latestYearStockPrice.priceShare
      );
      currentYearElement.portfolioValue = portfolioValue;
      console.log(currentYearElement.portfolioValue);

      // Q6/(1+'Resumen Anual'!I5) Portfolio Value with inflation
      currentYearElement.portfolioValueWithInflation =
        currentYearElement.portfolioValue /
        (1 + currentYearElement.accumulatedInflation);

      console.log(`PortfolioValueWithInflation =
        currentYearElement.portfolioValue ${currentYearElement.portfolioValue}
        /
        (1 + currentYearElement.accumulatedInflation) ${
          1 + currentYearElement.accumulatedInflation
        }
        =
        ${currentYearElement.portfolioValueWithInflation}
        `);
    } else {
      currentYearElement.portfolioValue = 0;
      currentYearElement.portfolioValueWithInflation = 0;
    }
    console.log("currentYearElement.portfolioValue");

    console.log(currentYearElement.portfolioValue);
  }
  return yearlyOperationsDict;
}
export function getPortfolioValue(
  accumulatedSharesNumber: number,
  priceShare: number
) {
  let portfolioValue = 0;
  if (!isNaN(accumulatedSharesNumber)) {
    portfolioValue = accumulatedSharesNumber * priceShare;
    console.log(
      `getPortfolioValue: accumShares * priceShare = ${accumulatedSharesNumber} * ${priceShare} = ${portfolioValue}`
    );
  }
  return portfolioValue;
}

import DividendService from "../../../services/dividend-service";
import StockPriceService from "../../../services/stock-price-service";
import { CompanyItemProps, CompanyTotalProps } from "../../../types/company";
import { calculateInflationForYear } from "../../CompanyDetailsTable/logic/inflation/inflation-logic";

export interface CompanyTotalDictProps {
  [year: string]: CompanyTotalProps | {};
}

export const computeCompanyData = (companies: CompanyItemProps[]) => {
  let modifiedTotal: CompanyTotalDictProps = {};

  //Ticker
  //Sector
  //Currency
  //Shares
  //Total
  //Commission
  //Total inv.
  companies.forEach((company) => {
    if (!modifiedTotal.hasOwnProperty(company.ticker)) {
      modifiedTotal[company.ticker] = { ticker: company.ticker };
    }

    let currentTotalElement = modifiedTotal[
      company.ticker
    ] as CompanyTotalProps;

    currentTotalElement.name = company.name;
    currentTotalElement.sector = company.sectorName || "";
    currentTotalElement.currency = company.currencyName || "";

    currentTotalElement.sharesNumber =
      (company.buySharesNumber || 0) - (company.sellSharesNumber || 0);

    currentTotalElement.investedAmount =
      (company.buyTotal || 0) -
      (company.sellTotal || 0) +
      (company.buyCommission || 0) +
      (company.sellCommission || 0);

    currentTotalElement.commission =
      (company.buyCommission || 0) + (company.sellCommission || 0);

    currentTotalElement.averagePriceWithoutCommission =
      ((company.buyTotal || 0) - (company.sellTotal || 0)) /
      currentTotalElement.sharesNumber;

    currentTotalElement.averagePrice =
      currentTotalElement.investedAmount / currentTotalElement.sharesNumber;

    //(H2-J2)/H2
    const commissionPercentage =
      (currentTotalElement.averagePrice -
        currentTotalElement.averagePriceWithoutCommission) /
      currentTotalElement.averagePrice;

    currentTotalElement.commissionPercentage = commissionPercentage;

    let lastPrice = 0;
    if (company.id !== undefined) {
      let lastStockPrice = new StockPriceService().getLastStockPriceByCompanyId(
        company.id
      );
      if (lastStockPrice) {
        lastPrice = lastStockPrice.priceShare;
      }
    }
    currentTotalElement.lastStockPrice = lastPrice;
    currentTotalElement.portfolioValue =
      lastPrice * currentTotalElement.sharesNumber;

    console.log(`Last operation date: ${company.lastOperationDate}`);

    if (company.lastOperationDate) {
      const year = new Date().getFullYear();
      console.log(`Full year is ${year}`);
      const inflation = calculateInflationForYear(year.toString());
      console.log(inflation);

      currentTotalElement.portfolioValueWithInflation =
        currentTotalElement.portfolioValue / (1 + inflation);

      currentTotalElement.accumReturn =
        currentTotalElement.portfolioValue - currentTotalElement.investedAmount;
      currentTotalElement.accumReturnPercentage =
        currentTotalElement.accumReturn / currentTotalElement.investedAmount;
    }

    if (company.id !== undefined) {
      const dividends = new DividendService().getDividendsByCompanyId(
        company.id
      );
      console.log(dividends);
      currentTotalElement.accumulatedDividendsGross = dividends.dividendsGross;
      currentTotalElement.accumulatedDividendsNet = dividends.dividendsNet;
    } else {
      currentTotalElement.accumulatedDividendsGross = 0;
      currentTotalElement.accumulatedDividendsNet = 0;
    }
    currentTotalElement.returnWithDividends =
      currentTotalElement.accumulatedDividendsNet +
      currentTotalElement.accumReturn;

    // (L2+P2-G2)/G2
    currentTotalElement.returnWithDividendsPercentage =
      (currentTotalElement.portfolioValue +
        currentTotalElement.accumulatedDividendsNet +
        currentTotalElement.investedAmount) /
      currentTotalElement.investedAmount;
    // modifiedTotal[company.ticker] = company.ticker;

    // let companyTotal: CompanyTotalProps = {};

    // companyTotal.ticker = company.ticker;
    // //Average Price
    // companyTotal.averagePrice = (company.buyTotal || 0) - (company.sellTotal || 0) +
    // (company.buyCommission || 0) + (company.sellCommission || 0)
  });

  console.log(modifiedTotal);
  let resultArray: CompanyTotalProps[] = [];
  for (var ticker in modifiedTotal) {
    const currentYearElement = modifiedTotal[ticker] as CompanyTotalProps;
    resultArray.push(currentYearElement);
  }

  return resultArray;
};

export default computeCompanyData;

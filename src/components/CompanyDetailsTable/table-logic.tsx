import { YearlyOperationsFields } from "../../types/company";
import { YearlyDividendFields } from "../../types/dividend";
import { YearlyShareFields } from "../../types/share";

export interface YearlyOperationsDictProps {
  [year: string]: YearlyOperationsFields | {};
}

export const computeYearlyData = (
  yearlyShares: YearlyShareFields[] | [],
  yearlyDividends: YearlyDividendFields[] | []
) => {
  let resultArray: YearlyOperationsFields[] = [];

  let years: YearlyOperationsDictProps = {};

  // Every year of operations
  if (yearlyShares.length > 0) {
    // There are operations
    years = setYearlySharesAttributes(yearlyShares, years);
    // Calculate the accumulated values for yearly shares
    years = setAccumulatedYearlySharesAttributes(yearlyShares, years);
  }

  if (yearlyDividends.length > 0) {
    // There are dividends
    years = setYearlyDividendsAttributes(yearlyDividends, years);
    // Accumulated values for dividends
    years = setAccumulatedYearlyDividendsAttributes(yearlyDividends, years);
  }
  console.log("Years are:", years);

  for (var key in years) {
    const currentYearElement = years[key] as YearlyOperationsFields;
    resultArray.push(currentYearElement);
  }

  return resultArray;
};
function setAccumulatedYearlyDividendsAttributes(
  dividends: YearlyDividendFields[],
  originYears: YearlyOperationsDictProps
) {
  let years = originYears;
  for (let index = 0; index < dividends.length; index++) {
    const yearlyDividends = dividends[index] as YearlyDividendFields;
    const currentYear = yearlyDividends.year;

    if (!years.hasOwnProperty(currentYear)) {
      years[currentYear] = {};
    }

    let currentYearElement = years[currentYear] as YearlyOperationsFields;

    if (!currentYearElement.accumulatedDividendsGross) {
      currentYearElement.accumulatedDividendsGross = 0;
    }

    if (!currentYearElement.accumulatedDividendsGrossBaseCurrency) {
      currentYearElement.accumulatedDividendsGrossBaseCurrency = 0;
    }

    if (!currentYearElement.accumulatedDividendsNet) {
      currentYearElement.accumulatedDividendsNet = 0;
    }

    if (!currentYearElement.accumulatedDividendsNetBaseCurrency) {
      currentYearElement.accumulatedDividendsNetBaseCurrency = 0;
    }

    for (let index = 0; index < dividends.length; index++) {
      const secondaryDividends = dividends[index] as YearlyDividendFields;
      const secondaryYear = secondaryDividends.year;

      if (parseInt(secondaryYear) <= parseInt(currentYear)) {
        currentYearElement.accumulatedDividendsGross +=
          secondaryDividends.dividendsGross;
        currentYearElement.accumulatedDividendsGrossBaseCurrency +=
          secondaryDividends.dividendsGrossBaseCurrency;
        currentYearElement.accumulatedDividendsNet +=
          secondaryDividends.dividendsNet;
        currentYearElement.accumulatedDividendsNetBaseCurrency +=
          secondaryDividends.dividendsNetBaseCurrency;
      }
    }
  }
  return years;
}
/**
 *
 * @param dividends
 * @param years
 */
function setYearlyDividendsAttributes(
  dividends: YearlyDividendFields[],
  originYears: YearlyOperationsDictProps
): YearlyOperationsDictProps {
  let years = originYears;
  for (let index = 0; index < dividends.length; index++) {
    const yearlyDividends = dividends[index] as YearlyDividendFields;
    const currentYear = yearlyDividends.year;

    if (!years.hasOwnProperty(currentYear)) {
      years[currentYear] = {};
    }

    let currentYearElement = years[currentYear] as YearlyOperationsFields;

    Object.assign(currentYearElement, yearlyDividends);

    currentYearElement.dividendsPerShare =
      yearlyDividends.dividendsGross / yearlyDividends.sharesNumber;
  }
  return years;
}
export function setAccumulatedYearlySharesAttributes(
  shares: YearlyShareFields[],
  originYears: YearlyOperationsDictProps
): YearlyOperationsDictProps {
  let years = originYears;
  for (let index = 0; index < shares.length; index++) {
    const yearlyShares = shares[index] as YearlyShareFields;
    const currentYear = yearlyShares.year;

    if (!years.hasOwnProperty(currentYear)) {
      years[currentYear] = { year: currentYear };
    }

    let currentYearElement = years[currentYear] as YearlyOperationsFields;

    if (!currentYearElement.accumulatedSharesNumber) {
      currentYearElement.accumulatedSharesNumber = 0;
    }

    if (!currentYearElement.accumulatedSoldAmount) {
      currentYearElement.accumulatedSoldAmount = 0;
    }

    if (!currentYearElement.accumulatedInvestment) {
      currentYearElement.accumulatedInvestment = 0;
    }

    if (!currentYearElement.accumulatedInvestmentCommission) {
      currentYearElement.accumulatedInvestmentCommission = 0;
    }

    if (!currentYearElement.accumulatedSellCommission) {
      currentYearElement.accumulatedSellCommission = 0;
    }

    for (let index = 0; index < shares.length; index++) {
      const secondaryShares = shares[index] as YearlyOperationsFields;
      const secondaryYear = secondaryShares.year;

      if (parseInt(secondaryYear) <= parseInt(currentYear)) {
        // Shares number
        currentYearElement.accumulatedSharesNumber +=
          secondaryShares.sharesBought - secondaryShares.sharesSold;
        //Investment
        currentYearElement.accumulatedInvestment +=
          secondaryShares.investedAmount;
        // Sold amount
        currentYearElement.accumulatedSoldAmount += secondaryShares.soldAmount;
        // Investment Commission
        currentYearElement.accumulatedInvestmentCommission +=
          secondaryShares.investmentCommission;
        // Sell Commission
        currentYearElement.accumulatedSellCommission +=
          secondaryShares.sellCommission;
      }
    }
  }
  return years;
}
/**
 *
 * @param shares
 * @param originYears
 */
export function setYearlySharesAttributes(
  shares: YearlyShareFields[],
  originYears: YearlyOperationsDictProps
): YearlyOperationsDictProps {
  let years = originYears;
  for (let index = 0; index < shares.length; index++) {
    const yearlyShares = shares[index] as YearlyShareFields;
    const currentYear = yearlyShares.year;

    if (!years.hasOwnProperty(currentYear)) {
      years[currentYear] = { year: currentYear };
    }

    let currentYearElement = years[currentYear] as YearlyOperationsFields;

    Object.assign(currentYearElement, yearlyShares);

    currentYearElement.averagePrice =
      yearlyShares.investedAmount / yearlyShares.sharesBought;
    currentYearElement.totalInvestedWithCommission =
      yearlyShares.investedAmount + yearlyShares.investmentCommission;
  }
  return years;
}

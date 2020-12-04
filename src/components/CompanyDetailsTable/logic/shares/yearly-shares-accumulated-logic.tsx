import { YearlyOperationsFields } from "../../../../types/company";
import { YearlyShareFields } from "../../../../types/share";
import { YearlyOperationsDictProps } from "../table-logic";

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
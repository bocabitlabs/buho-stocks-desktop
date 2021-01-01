import { YearlyOperationsFields } from "types/company";
import { YearlyOperationsDictProps } from "../table-logic";

/**
 *
 * @param modifiedYears
 */
export function setAccumulatedYearlySharesAttributes(
  modifiedYears: YearlyOperationsDictProps
): YearlyOperationsDictProps {
  let yearsWithExtraFields = modifiedYears;

  Object.entries(modifiedYears).forEach(([year, currentValues]) => {
    const currentYearElement = currentValues as YearlyOperationsFields;

    Object.entries(modifiedYears).forEach(([year2, currentValues2]) => {
      const yearlyValues2 = currentValues2 as YearlyOperationsFields;

      initializeNaNValues(currentYearElement);

      if (parseInt(year2) <= parseInt(year)) {
        // Shares number
        currentYearElement.accumulatedSharesNumber +=
          yearlyValues2.sharesBought - yearlyValues2.sharesSold;
        //Accumulated Investment
        if (!isNaN(yearlyValues2.ivestmentWithCommission)) {
          currentYearElement.accumulatedInvestment +=
            yearlyValues2.ivestmentWithCommission;
          // console.log(
          //   `accumulatedInvestment is ${currentYearElement.accumulatedInvestment} +(${yearlyValues2.ivestmentWithCommission})`
          // );
        }
        // Sold amount
        currentYearElement.accumulatedSoldAmount += yearlyValues2.soldAmount;
        // Investment Commission
        currentYearElement.accumulatedInvestmentCommission +=
          yearlyValues2.investmentCommission;
        // Sell Commission
        currentYearElement.accumulatedSellCommission +=
          yearlyValues2.sellCommission;
      }
    });
  });

  return yearsWithExtraFields;
}
function initializeNaNValues(currentYearElement: YearlyOperationsFields) {
  if (isNaN(currentYearElement.accumulatedSharesNumber)) {
    currentYearElement.accumulatedSharesNumber = 0;
  }

  if (isNaN(currentYearElement.accumulatedInvestment)) {
    currentYearElement.accumulatedInvestment = 0;
  }

  if (isNaN(currentYearElement.accumulatedInvestmentCommission)) {
    currentYearElement.accumulatedInvestmentCommission = 0;
  }

  if (isNaN(currentYearElement.accumulatedSellCommission)) {
    currentYearElement.accumulatedSellCommission = 0;
  }

  if (isNaN(currentYearElement.accumulatedSoldAmount)) {
    currentYearElement.accumulatedSoldAmount = 0;
  }
}

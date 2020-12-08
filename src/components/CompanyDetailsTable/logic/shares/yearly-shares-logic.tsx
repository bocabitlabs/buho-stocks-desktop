import { YearlyOperationsFields } from "../../../../types/company";
import { YearlyShareFields } from "../../../../types/share";
import { YearlyOperationsDictProps } from "../table-logic";

/**
 *
 * @param shares
 * @param originYears
 */
export function setYearlySharesAttributes(
  shares: YearlyShareFields[],
): YearlyOperationsDictProps {
  let modifiedYears: YearlyOperationsDictProps = {};

  for (let index = 0; index < shares.length; index++) {
    const yearlyShares = shares[index] as YearlyShareFields;
    const currentYear = yearlyShares.year;

    if (!modifiedYears.hasOwnProperty(currentYear)) {
      modifiedYears[currentYear] = { year: currentYear };
    }

    let currentYearElement = modifiedYears[currentYear] as YearlyOperationsFields;

    Object.assign(currentYearElement, yearlyShares);

    // Average price
    currentYearElement.averagePrice =
      yearlyShares.investedAmount / yearlyShares.sharesBought;
    //Investment with Commission
    currentYearElement.ivestmentWithCommission =
      yearlyShares.investedAmount + yearlyShares.investmentCommission;
  }
  return modifiedYears;
}
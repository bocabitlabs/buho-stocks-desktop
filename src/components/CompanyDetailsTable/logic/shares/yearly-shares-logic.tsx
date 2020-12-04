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
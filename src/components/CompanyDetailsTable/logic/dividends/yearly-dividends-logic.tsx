import { YearlyOperationsFields } from "../../../../types/company";
import { YearlyDividendFields } from "../../../../types/dividend";
import { YearlyOperationsDictProps } from "../table-logic";


/**
 *
 * @param dividends
 * @param years
 */
export function setYearlyDividendsAttributes(
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

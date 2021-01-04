import { YearlyOperationsFields } from "types/company";
import { YearlyDividendFields } from "types/dividends-transaction";
import { YearlyOperationsDictProps } from "../table-logic";


/**
 * Asign all the values from the dividends to the current
 * object in the dictionary
 * @param dividends
 * @type dividends: YearlyDividendFields[]
 * @param years
 * @type years: YearlyOperationsDictProps
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

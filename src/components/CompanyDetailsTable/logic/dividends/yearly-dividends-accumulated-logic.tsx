import { YearlyOperationsFields } from "../../../../types/company";
import { YearlyDividendFields } from "../../../../types/dividend";
import { YearlyOperationsDictProps } from "../table-logic";


export function setAccumulatedYearlyDividendsAttributes(
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
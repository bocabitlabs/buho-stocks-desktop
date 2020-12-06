import InflationService from "../../../../services/inflation/inflation-service";
import { YearlyOperationsFields } from "../../../../types/company";
import { InflationItemProps } from "../../../../types/inflation";
import { YearlyOperationsDictProps } from "../table-logic";

/**
 * Calculate the inflation for all the years in the yearlyOperations array.
 * https://www.contabilidae.com/inflacion/#Inflacion_acumulada
 * @param yearlyOperations
 */
export function calculateInflationForYears(
  yearlyOperationsDict: YearlyOperationsDictProps
) {
  for (let year in yearlyOperationsDict) {
    const {
      accumulatedInflation,
      currentYearElement
    } = calculateInflationForYear(yearlyOperationsDict, year);
    console.log(`Accum. Inflation for year: ${year}=${accumulatedInflation}`);
    currentYearElement.accumulatedInflation = accumulatedInflation;
  }
  return yearlyOperationsDict;
}

/**
 * Calculate the inflation and the accumulated inflation for a given year in the yearlyOperations array
 * @param years
 * @param year
 */
export function calculateInflationForYear(
  yearlyOperationsDict: YearlyOperationsDictProps,
  year: string
) {
  const currentYearElement = yearlyOperationsDict[
    year
  ] as YearlyOperationsFields;
  const inflationsForYear = InflationService.getInflationsForYear(
    parseInt(year)
  );
  let accumulatedInflation = 0;
  let count = 0;
  inflationsForYear.forEach((inflation: InflationItemProps) => {
    if (inflation.year <= parseInt(year)) {
      if (count === 0) {
        accumulatedInflation = inflation.percentage / 100;
      } else {
        let currentInflation = inflation.percentage / 100;
        accumulatedInflation += currentInflation * (1 + accumulatedInflation);
      }
    }
    count++;
  });

  return { accumulatedInflation, currentYearElement };
}

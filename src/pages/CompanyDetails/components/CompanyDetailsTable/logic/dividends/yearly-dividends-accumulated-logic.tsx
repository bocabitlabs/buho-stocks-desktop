import { YearlyOperationsFields } from "types/company";
import { YearlyDividendFields } from "types/dividends-transaction";
import { YearlyOperationsDictProps } from "../table-logic";

export function setAccumulatedYearlyDividendsAttributes(
  dividends: YearlyDividendFields[],
  modifiedYears: YearlyOperationsDictProps
) {
  // let years = originYears;


  Object.entries(modifiedYears).forEach(([year, currentValues]) => {
    const currentYearElement = currentValues as YearlyOperationsFields;


    initializeNaNValues(currentYearElement);

    dividends.forEach((element: YearlyDividendFields) => {
      const secondaryDividends = element;
      const year2 = secondaryDividends.year;

      // initializeDividendNaNValues(secondaryDividends);

      // Only accumulate lower years
      if (parseInt(year2) <= parseInt(year)) {
        // Accumulated Dividends gross
        currentYearElement.accumulatedDividendsGross +=
          secondaryDividends.dividendsGross;
        // Accumulated Dividends gross base currency
        currentYearElement.accumulatedDividendsGrossBaseCurrency +=
          secondaryDividends.dividendsGrossBaseCurrency;
        // Accumulated Dividends Net
        currentYearElement.accumulatedDividendsNet +=
          secondaryDividends.dividendsNet;
        // Accumulated Dividends Net Base Currency
        currentYearElement.accumulatedDividendsNetBaseCurrency +=
          secondaryDividends.dividendsNetBaseCurrency;
      }
    });
  });
  // for (let index = 0; index < dividends.length; index++) {
  //   const yearlyDividends = dividends[index] as YearlyDividendFields;
  //   const currentYear = yearlyDividends.year;

  //   if (!years.hasOwnProperty(currentYear)) {
  //     years[currentYear] = {};
  //   }

  //   let currentYearElement = years[currentYear] as YearlyOperationsFields;

  //   console.log(
  //     `Handling Year ${currentYearElement.year}`
  //   );

  //   initializeNaNValues(currentYearElement);

  //   // For each year, iterate all the years
  //   for (let index = 0; index < dividends.length; index++) {
  //     const secondaryDividends = dividends[index] as YearlyDividendFields;
  //     const secondaryYear = secondaryDividends.year;

  //     console.log(
  //       `Handling Year Secondary ${secondaryYear}`
  //     );

  //     initializeDividendNaNValues(secondaryDividends);

  //     // Only accumulate lower years
  //     if (parseInt(secondaryYear) <= parseInt(currentYear)) {
  //       console.log(
  //         `Secondary dividends gross: ${secondaryDividends.dividendsGross}`
  //       );
  //       // Accumulated Dividends gross
  //       currentYearElement.accumulatedDividendsGross +=
  //         secondaryDividends.dividendsGross;
  //       // Accumulated Dividends gross base currency
  //       currentYearElement.accumulatedDividendsGrossBaseCurrency +=
  //         secondaryDividends.dividendsGrossBaseCurrency;
  //       // Accumulated Dividends Net
  //       currentYearElement.accumulatedDividendsNet +=
  //         secondaryDividends.dividendsNet;
  //       // Accumulated Dividends Net Base Currency
  //       currentYearElement.accumulatedDividendsNetBaseCurrency +=
  //         secondaryDividends.dividendsNetBaseCurrency;
  //     }
  //   }
  //   console.log(
  //     `Year ${currentYearElement.year} Accumulated dividends gross: ${currentYearElement.accumulatedDividendsGross}`
  //   );
  // }
  return modifiedYears;
}

function initializeDividendNaNValues(
  currentYearElement: YearlyOperationsFields
) {
  if (
    isNaN(currentYearElement.dividendsGross) ||
    currentYearElement.dividendsGross === undefined
  ) {
    currentYearElement.dividendsGross = 0;
  }

  if (isNaN(currentYearElement.dividendsGrossBaseCurrency)) {
    currentYearElement.dividendsGrossBaseCurrency = 0;
  }

  if (isNaN(currentYearElement.dividendsNet)) {
    currentYearElement.dividendsNet = 0;
  }

  // if (isNaN(currentYearElement.dividendsNetBaseCurrency)) {
  //   currentYearElement.dividendsNetBaseCurrency = 0;
  // }
}

function initializeNaNValues(currentYearElement: YearlyOperationsFields) {
  if (isNaN(currentYearElement.dividendsGross)) {
    currentYearElement.dividendsGross = 0;
  }

  if (isNaN(currentYearElement.dividendsGrossBaseCurrency)) {
    currentYearElement.dividendsGrossBaseCurrency = 0;
  }

  if (isNaN(currentYearElement.dividendsNet)) {
    currentYearElement.dividendsNet = 0;
  }

  if (isNaN(currentYearElement.accumulatedDividendsGross)) {
    currentYearElement.accumulatedDividendsGross = 0;
  }

  if (isNaN(currentYearElement.accumulatedDividendsGrossBaseCurrency)) {
    currentYearElement.accumulatedDividendsGrossBaseCurrency = 0;
  }

  if (isNaN(currentYearElement.accumulatedDividendsNet)) {
    currentYearElement.accumulatedDividendsNet = 0;
  }

  if (isNaN(currentYearElement.accumulatedDividendsNetBaseCurrency)) {
    currentYearElement.accumulatedDividendsNetBaseCurrency = 0;
  }

}

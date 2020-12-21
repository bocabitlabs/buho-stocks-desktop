import {
  PortfolioYearlyFields,
  PortfolioYearlyProps,
  YearlyTotalDictProps
} from "../../../types/company";
import { setAccumulatedAttributes } from "./set-accumulated-attributes";
import { setCalculatedAttributes } from "./set-calculated-attributes";
import { setPortfolioValueAttributes } from "./set-portfolio-value-attributes";

export const computeYearlyData = (
  portfolioDataYears: PortfolioYearlyProps[]
): PortfolioYearlyProps[] => {
  let modifiedTotal: YearlyTotalDictProps = {};
  // Iterate all years
  portfolioDataYears.forEach((yearData) => {
    // Create the year if it doesn't exist
    let currentYear = initializeYear(modifiedTotal, yearData);
    console.log(yearData);
    setCalculatedAttributes(currentYear, yearData);
  });
  console.log(modifiedTotal);

  setAccumulatedAttributes(modifiedTotal);
  setPortfolioValueAttributes(modifiedTotal);

  // Convert from Dict to Array
  let resultArray: PortfolioYearlyFields[] = [];
  for (var year in modifiedTotal) {
    const currentYearElement = modifiedTotal[year] as PortfolioYearlyFields;
    resultArray.push(currentYearElement);
  }

  console.log(resultArray);

  return resultArray;
};

function initializeYear(
  modifiedTotal: YearlyTotalDictProps,
  yearData: PortfolioYearlyProps
) {
  if (!modifiedTotal.hasOwnProperty(yearData.year)) {
    modifiedTotal[yearData.year] = { year: yearData.year };
  }

  const currentYear = modifiedTotal[yearData.year] as PortfolioYearlyProps;
  return currentYear;
}

import {
  PortfolioYearlyFields,
  PortfolioYearlyProps
} from "../../../types/company";
import { setAccumulatedAttributes } from "./set-accumulated-attributes";
import { setCalculatedAttributes } from "./set-calculated-attributes";

export interface YearlyTotalDictProps {
  [year: string]: PortfolioYearlyProps | {};
}

export const computeYearlyData = (
  portfolioDataYears: PortfolioYearlyProps[]
): PortfolioYearlyProps[] => {
  let modifiedTotal: YearlyTotalDictProps = {};
  // Iterate all years
  portfolioDataYears.forEach((yearData) => {
    // Create the year if it doesn't exist
    let currentYear = initializeYear(modifiedTotal, yearData);
    setCalculatedAttributes(currentYear, yearData);
  });

  setAccumulatedAttributes(modifiedTotal)

  // Convert from Dict to Array
  let resultArray: PortfolioYearlyFields[] = [];
  for (var year in modifiedTotal) {
    const currentYearElement = modifiedTotal[year] as PortfolioYearlyFields;
    resultArray.push(currentYearElement);
  }

  console.log(resultArray);

  return resultArray;
};


function initializeYear(modifiedTotal: YearlyTotalDictProps, yearData: PortfolioYearlyProps) {
  if (!modifiedTotal.hasOwnProperty(yearData.year)) {
    modifiedTotal[yearData.year] = { year: yearData.year };
  }

  const currentYear = modifiedTotal[
    yearData.year
  ] as PortfolioYearlyProps;
  return currentYear;
}


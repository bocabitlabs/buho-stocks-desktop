import {
  PortfolioYearlyFields,
  PortfolioYearlyProps
} from "../../../types/company";

export interface YearlyTotalDictProps {
  [year: string]: PortfolioYearlyProps | {};
}

export const computeYearlyData = (
  portfolioDataYears: PortfolioYearlyProps[]
): PortfolioYearlyProps[] => {
  let modifiedTotal: YearlyTotalDictProps = {};

  portfolioDataYears.forEach((company) => {
    if (!modifiedTotal.hasOwnProperty(company.year)) {
      modifiedTotal[company.year] = { year: company.year };
    }

    console.log(company.year)

    let currentTotalElement = modifiedTotal[
      company.year
    ] as PortfolioYearlyProps;

    currentTotalElement.portfolioId = company.portfolioId

  });


  // Convert from Dict to Array
  let resultArray: PortfolioYearlyFields[] = [];
  for (var year in modifiedTotal) {
    const currentYearElement = modifiedTotal[year] as PortfolioYearlyFields;
    resultArray.push(currentYearElement);
  }

  console.log(resultArray)

  return resultArray;
};

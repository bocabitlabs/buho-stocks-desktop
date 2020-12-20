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

  portfolioDataYears.forEach((yearData) => {
    if (!modifiedTotal.hasOwnProperty(yearData.year)) {
      modifiedTotal[yearData.year] = { year: yearData.year };
    }

    console.log(yearData.year);

    let currentTotalElement = modifiedTotal[
      yearData.year
    ] as PortfolioYearlyProps;

    currentTotalElement.portfolioId = yearData.portfolioId;

    // Number of shares
    currentTotalElement.sharesNumber = yearData.sharesBought - yearData.sharesSold;

    //Investment with Commission
    currentTotalElement.investedWithCommission =
    (yearData.buyTotal || 0) -
    (yearData.sellTotal || 0) +
    (yearData.buyCommission || 0) +
    (yearData.sellCommission || 0);
  });

  // Convert from Dict to Array
  let resultArray: PortfolioYearlyFields[] = [];
  for (var year in modifiedTotal) {
    const currentYearElement = modifiedTotal[year] as PortfolioYearlyFields;
    resultArray.push(currentYearElement);
  }

  console.log(resultArray);

  return resultArray;
};

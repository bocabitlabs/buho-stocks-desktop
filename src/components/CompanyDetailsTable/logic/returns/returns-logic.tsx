import { YearlyOperationsFields } from "../../../../types/company";
import { YearlyOperationsDictProps } from "../table-logic";

export function calculatePortfolioReturns(years: YearlyOperationsDictProps) {
  let previousYearPortfolioValueWithInflation = 0;
  let previousYearPortfolioValue = 0;
  for (let year in years) {
    const currentYearElement = years[year] as YearlyOperationsFields;

    // = portfolio value with inflation - (previous year's portfolio value with inflation + new investment)
    const yearReturn =
      currentYearElement.portfolioValueInflation -
      (previousYearPortfolioValueWithInflation +
        currentYearElement.investedAmount);

    currentYearElement.yearReturn = yearReturn;

    currentYearElement.accumulatedReturn =
      currentYearElement.portfolioValueInflation -
      currentYearElement.accumulatedInvestment;
    // =SI((S3+F4)>0,(S4-(S3+F4))/(S3+F4),0)
    // S3: previous year portfolio value
    // F4: new investment current year
    // S4: current year portfolio value
    let returnPercentage = 0;
    if (previousYearPortfolioValue + currentYearElement.investedAmount > 0) {
      console.log("CALCULATING RETURN PERCENTAGE");
      console.log(
        `previousYearPortfolioValue + currentYearElement.investedAmount = ${previousYearPortfolioValue} + ${
          currentYearElement.investedAmount
        } = ${previousYearPortfolioValue + currentYearElement.investedAmount}`
      );
      returnPercentage =
        (currentYearElement.portfolioValue -
          (previousYearPortfolioValue + currentYearElement.investedAmount)) /
        (previousYearPortfolioValue + currentYearElement.investedAmount);
      console.log(`Return percentage= ${returnPercentage}`);
    } else {
      returnPercentage = 0;
    }
    currentYearElement.returnPercentage = returnPercentage * 100;

    // // =SI(G3>0,(S3-G3)/G3,0)
    // if(currentYearElement.accumulatedInvestment>0){
    //   returnPercentage = (currentYearElement.investedAmount - currentYearElement.accumulatedInvestment)/currentYearElement.accumulatedInvestment

    // }
    // =SI(G4>0,(S4-G4)/G4,0)
    if (currentYearElement.accumulatedInvestment > 0) {
      currentYearElement.accumulatedReturnPercentage =
        ((currentYearElement.portfolioValue -
          currentYearElement.accumulatedInvestment) /
          currentYearElement.accumulatedInvestment) *
        100;
    } else {
      currentYearElement.accumulatedReturnPercentage = 0;
    }

    // Set previous year values
    previousYearPortfolioValueWithInflation =
      currentYearElement.portfolioValueInflation;
    previousYearPortfolioValue = currentYearElement.portfolioValue;

    if (currentYearElement.portfolioValue > 0) {
      currentYearElement.dividendsReturnPercentage =
        currentYearElement.dividendsGross / currentYearElement.portfolioValue * 100;
    } else {
      currentYearElement.dividendsReturnPercentage = 0;
    }

    if (currentYearElement.accumulatedInvestment > 0) {
      currentYearElement.yoc =
        currentYearElement.dividendsGross / currentYearElement.accumulatedInvestment * 100;
    } else {
      currentYearElement.yoc = 0;
    }

    if (currentYearElement.latestYearStockPrice > 0) {
      currentYearElement.rpdEmp =
        currentYearElement.dividendsPerShare / currentYearElement.latestYearStockPrice * 100;
    } else {
      currentYearElement.rpdEmp = 0;
    }


  }
  return years;
}

import { YearlyOperationsFields } from "../../../../types/company";
import { YearlyOperationsDictProps } from "../table-logic";

export function calculatePortfolioReturns(years: YearlyOperationsDictProps) {
  let previousYearPortfolioValueWithInflation = 0;
  let previousYearPortfolioValue = 0;
  for (let year in years) {
    const currentYearElement = years[year] as YearlyOperationsFields;

    console.log(`Calculating return for year ${currentYearElement.year}`);
    // = portfolio value with inflation - (previous year's portfolio value with inflation + new investment)
    const yearReturn = getCurrentYearReturn(
      currentYearElement.portfolioValueWithInflation,
      currentYearElement.ivestmentWithCommission,
      previousYearPortfolioValueWithInflation
    );
    currentYearElement.yearReturn = yearReturn;

    console.log(`Calculating acum. return for year ${currentYearElement.year}`);
    const accumulatedReturn = getAccumulatedReturn(
      currentYearElement.portfolioValueWithInflation,
      currentYearElement.accumulatedInvestment
    );
    currentYearElement.accumulatedReturn = accumulatedReturn;

    console.log(
      `Calculating return percentage for year ${currentYearElement.year}`
    );
    let returnPercentage = getReturnPercentage(
      currentYearElement.ivestmentWithCommission,
      currentYearElement.portfolioValue,
      previousYearPortfolioValue
    );
    currentYearElement.returnPercentage = returnPercentage * 100;

    // // =SI(G3>0,(S3-G3)/G3,0)
    // if(currentYearElement.accumulatedInvestment>0){
    //   returnPercentage = (currentYearElement.investedAmount - currentYearElement.accumulatedInvestment)/currentYearElement.accumulatedInvestment

    // }
    // =SI(G4>0,(S4-G4)/G4,0)
    let accumulatedReturnPercentage = getCurrentYearAccumulatedReturnPercentage(
      currentYearElement.accumulatedInvestment,
      currentYearElement.portfolioValue
    );
    currentYearElement.accumulatedReturnPercentage = accumulatedReturnPercentage;

    let dividendsReturnPercentage = getDividendsReturnPercentage(
      currentYearElement.portfolioValue,
      currentYearElement.dividendsGross
    );
    currentYearElement.dividendsReturnPercentage = dividendsReturnPercentage;

    let yoc = getYoc(
      currentYearElement.dividendsGross,
      currentYearElement.accumulatedInvestment
    );
    currentYearElement.yoc = yoc;

    let rpdEmp = getCurrenYearRpdEmp(
      currentYearElement.latestYearStockPrice,
      currentYearElement.dividendsPerShare
    );
    currentYearElement.rpdEmp = rpdEmp;

    // Set previous year values
    previousYearPortfolioValueWithInflation =
      currentYearElement.portfolioValueWithInflation;
    previousYearPortfolioValue = currentYearElement.portfolioValue;
  }
  return years;
}

function getReturnPercentage(
  totalInvestedWithCommission: number,
  portfolioValue: number,
  previousYearPortfolioValue: number
) {
  let returnPercentage = 0;
  // =IF((S3+F4)>0,(S4-(S3+F4))/(S3+F4),0)
  // S3: previous year portfolio value
  // F4: new investment current year
  // S4: current year portfolio value
  if (previousYearPortfolioValue + totalInvestedWithCommission > 0) {
    returnPercentage =
      (portfolioValue -
        (previousYearPortfolioValue + totalInvestedWithCommission)) /
      (previousYearPortfolioValue + totalInvestedWithCommission);
    console.log(`Return percentage= ${returnPercentage}`);
  } else {
    returnPercentage = 0;
  }
  return returnPercentage;
}

function getCurrentYearAccumulatedReturnPercentage(
  accumulatedInvestment: number,
  portfolioValue: number
) {
  let accumulatedReturnPercentage = 0;
  if (accumulatedInvestment > 0) {
    accumulatedReturnPercentage =
      ((portfolioValue - accumulatedInvestment) / accumulatedInvestment) * 100;
  }
  return accumulatedReturnPercentage;
}

export function getDividendsReturnPercentage(
  portfolioValue: number,
  dividendsGross: number
) {
  let dividendsReturnPercentage = 0;

  if (isNaN(dividendsGross)) {
    dividendsGross = 0;
  }

  if (portfolioValue > 0) {
    dividendsReturnPercentage = (dividendsGross / portfolioValue) * 100;
  } else {
    dividendsReturnPercentage = 0;
  }
  return dividendsReturnPercentage;
}

export function getYoc(
  dividendsGross: number,
  accumulatedInvestment: number
) {
  let yoc = 0;

  if (isNaN(dividendsGross)) {
    dividendsGross = 0;
  }

  if (accumulatedInvestment > 0) {
    yoc = (dividendsGross / accumulatedInvestment) * 100;
  }
  return yoc;
}

function getCurrenYearRpdEmp(
  latestYearStockPrice: number,
  dividendsPerShare: number
) {
  let rpdEmp = 0;

  if (isNaN(dividendsPerShare)) {
    dividendsPerShare = 0;
  }

  if (latestYearStockPrice > 0) {
    rpdEmp = (dividendsPerShare / latestYearStockPrice) * 100;
  }
  return rpdEmp;
}

export function getAccumulatedReturn(
  portfolioValueWithInflation: number,
  accumulatedInvestment: number
) {
  const acumReturn = portfolioValueWithInflation - accumulatedInvestment;
  console.log(
    `getAccumulatedReturn = portfolioValueWithInflation ${portfolioValueWithInflation} - accumulatedInvestment ${accumulatedInvestment} = ${acumReturn}`
  );
  return acumReturn;
}

export function getCurrentYearReturn(
  portfolioValueWithInflation: number,
  totalInvestedWithCommission: number,
  previousYearPortfolioValueWithInflation: number
) {
  const yearReturn =
    portfolioValueWithInflation -
    (previousYearPortfolioValueWithInflation + totalInvestedWithCommission);
  console.log(
    `getCurrentYearReturn = portfolioValueWithInflation (${portfolioValueWithInflation}) - previousYearPortfolioValueWithInflation (${previousYearPortfolioValueWithInflation}) + totalInvestedWithCommission (${totalInvestedWithCommission}) = ${yearReturn}`
  );
  return yearReturn;
}

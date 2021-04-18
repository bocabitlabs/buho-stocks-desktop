export interface IPortfolioReturns {
  getReturnForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnPercentageCumulativeForYear(
    year: string,
    inBaseCurrency?: boolean
  ): number;
  getReturnPercentageForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnWithDividends(inBaseCurrency?: boolean): number;
  getReturnWithDividendsPercentage(inBaseCurrency?: boolean): number;
  getReturnWithDividendsForYear(year: string, inBaseCurrency?: boolean): number;
  getReturnPercentageWithDividendsForYearCumulative(
    year: string,
    inBaseCurrency?: boolean
  ): number;
}
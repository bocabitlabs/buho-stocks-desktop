export interface IPortfolioDividends {
  getDividends(inBaseCurrency?: boolean): number;
  getDividendsForYear(year?: string, inBaseCurrency?: boolean): number;
  getCumulativeDividendsForYear(
    year?: string,
    inBaseCurrency?: boolean
  ): number;
  getCumulativePortfolioDividendsAmountForYear(
    year?: string,
    inBaseCurrency?: boolean
  ): number;
  getMonthlyDividendsForYear(year: string, inBaseCurrency?: boolean): number;
}

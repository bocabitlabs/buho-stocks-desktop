export interface IPortfolioValue {
  getPortfolioValue(inBaseCurrency?: boolean): number;
  getPortfolioValueForYear(year: string, inBaseCurrency?: boolean): number;
}
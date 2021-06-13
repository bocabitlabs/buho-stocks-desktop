export interface IPortfolioInvestments {
  getTotalInvested(inBaseCurrency?: boolean): number;
  getTotalInvestedOnYear(year: string, inBaseCurrency?: boolean): number;
  getTotalInvestedUntilYear(year: string, inBaseCurrency?: boolean): number;
}
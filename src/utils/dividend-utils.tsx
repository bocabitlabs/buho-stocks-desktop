export class DividendUtils {
  getAmount = (amount: number) => {
    return amount;
  };

  getAmountWithSymbol = (priceShare: number, symbol: string = "?") => {
    return `${this.getAmount(priceShare)} ${symbol}`;
  };

  getTotalInvested = (
    sharesNumber: number,
    sharePrice: number,
    commission: number
  ) => {
    return sharesNumber * sharePrice - commission;
  };

  getTotalInvestedWithSymbol = (
    sharesNumber: number,
    sharePrice: number,
    commission: number,
    currencySymbol: string = "?"
  ) => {
    return `${this.getTotalInvested(
      sharesNumber,
      sharePrice,
      commission
    )} ${currencySymbol}`;
  };
}

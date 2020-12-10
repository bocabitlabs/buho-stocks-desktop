export const getAmountWithSymbol = (priceShare: string, symbol: string = "?") => {
  return `${priceShare} ${symbol}`;
};

const exportedModule = {
  getAmountWithSymbol
}

export default exportedModule;

// export class DividendUtils {
//   getAmount = (amount: number) => {
//     return amount;
//   };

//   getPercentage = (value: string) => {
//     return `${value} %`;
//   };

//   static getAmountWithSymbol = (priceShare: string, symbol: string = "?") => {
//     return `${priceShare} ${symbol}`;
//   };

//   getTotalInvested = (
//     sharesNumber: number,
//     sharePrice: number,
//     commission: number
//   ) => {
//     return sharesNumber * sharePrice - commission;
//   };

//   getTotalInvestedWithSymbol = (
//     sharesNumber: number,
//     sharePrice: number,
//     commission: number,
//     currencySymbol: string = "?"
//   ) => {
//     return `${this.getTotalInvested(
//       sharesNumber,
//       sharePrice,
//       commission
//     )} ${currencySymbol}`;
//   };
// }

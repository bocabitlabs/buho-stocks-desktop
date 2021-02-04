export class StringUtils {
  static getAmountWithSymbol = (
    amount: number,
    precision = 2,
    suffix: string = "?"
  ) => {
    return `${amount.toFixed(precision)} ${suffix}`;
  };
}

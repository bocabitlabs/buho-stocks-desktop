import { ICompanyPortfolioValue, ICompanyShares, ICompanyStockPrices } from "types/company";

export class CompanyPortfolioValue implements ICompanyPortfolioValue {
  prices: ICompanyStockPrices;
  shares: ICompanyShares;
  companyName: string;

  constructor(name: string, prices: ICompanyStockPrices, shares: ICompanyShares) {
    this.companyName = name;
    this.prices = prices;
    this.shares = shares;
  }

  getPortfolioValue(inPortfolioCurrency = false): number {
    const sharesCount = this.shares.getSharesCount();
    const lastStockPrice = this.prices.getLatestStockPrice(inPortfolioCurrency);

    if (lastStockPrice === null || sharesCount === 0) {
      return 0;
    }

    return sharesCount * lastStockPrice.price;
  }

  getPortfolioValueForYear(year: string, inPortfolioCurrency = false): number {
    let accumulated = 0;

    const sharesCount = this.shares.getCumulativeSharesCountUntilYear(year);
    const lastStockPrice = this.prices.getLatestStockPriceForYear(
      year,
      inPortfolioCurrency
    );
    if (sharesCount > 0 && lastStockPrice === null) {
      console.error(
        `${this.companyName}: No stock price value for ${year}. shares: ${sharesCount}`
      );
    }

    if (
      lastStockPrice !== null &&
      lastStockPrice !== undefined &&
      sharesCount !== 0
    ) {
      accumulated = sharesCount * lastStockPrice.price;
    }

    return accumulated;
  }
}
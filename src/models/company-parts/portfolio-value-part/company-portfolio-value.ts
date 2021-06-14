import { ICompanyPortfolioValue } from "types/company-parts/portfolio-value/portfolio-value-part";
import { ICompanyShares } from "types/company-parts/shares-part/shares-part";
import { ICompanyStockPrices } from "types/company-parts/stock-prices-part/stock-prices-part";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyShares } from "../shares-part/company-shares";
import { CompanyStockPrices } from "../stock-prices-part/company-stock-prices";

export class CompanyPortfolioValue implements ICompanyPortfolioValue {
  shares: ICompanyShares;
  companyName: string;
  prices: ICompanyStockPrices;

  constructor(name: string,  sharesList: ISharesTransaction[], stockPrices: IStockPrice[]) {
    this.companyName = name;
    this.prices = new CompanyStockPrices(stockPrices);
    this.shares = new CompanyShares(sharesList)
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
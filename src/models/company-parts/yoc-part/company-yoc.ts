import { ICompanyDividends } from "types/company-parts/dividends-part/dividends-part";
import { ICompanyPortfolioValue } from "types/company-parts/portfolio-value/portfolio-value-part";
import { ICompanyYoc } from "types/company-parts/yoc-part/yoc-part";
import { IDividendsTransaction } from "types/dividends-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { IStockPrice } from "types/stock-price";
import { CompanyDividends } from "../dividends-part/company-dividends";
import { CompanyPortfolioValue } from "../portfolio-value-part/company-portfolio-value";

export class CompanyYoc implements ICompanyYoc {
  dividends: ICompanyDividends;
  portfolioValue: ICompanyPortfolioValue;

  constructor(
    companyName: string,
    dividendsTransactions: IDividendsTransaction[],
    sharesTransactions: ISharesTransaction[],
    stockPrices: IStockPrice[]
  ) {
    this.dividends = new CompanyDividends(dividendsTransactions);
    this.portfolioValue = new CompanyPortfolioValue(
      companyName,
      sharesTransactions,
      stockPrices
    );
  }

  getYoc(inPortfolioCurrency = false): number {
    const dividendsAmount = this.dividends.getDividendsAmount(
      inPortfolioCurrency
    );
    const value = this.portfolioValue.getPortfolioValue(inPortfolioCurrency);
    const yoc = (dividendsAmount / value) * 100;
    return yoc;
  }
}

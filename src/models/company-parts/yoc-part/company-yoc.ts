import { ICompanyDividends } from "types/company-parts/dividends-part/dividends-part";
import { ICompanyInvestment } from "types/company-parts/investment-part/investment-part";
import { ICompanyYoc } from "types/company-parts/yoc-part/yoc-part";
import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { CompanyDividends } from "../dividends-part/company-dividends";
import { CompanyInvestment } from "../investment-part/company-investment";

export class CompanyYoc implements ICompanyYoc {
  dividends: ICompanyDividends;
  investment: ICompanyInvestment;

  constructor(
    dividendsTransactions: IDividendsTransaction[],
    sharesTransactions: ISharesTransaction[],
    rightsTransactions: IRightsTransaction[]
  ) {
    this.dividends = new CompanyDividends(dividendsTransactions);
    this.investment = new CompanyInvestment(
      sharesTransactions,
      rightsTransactions
    );
  }

  getYoc(inPortfolioCurrency = false): number {
    const dividendsAmount = this.dividends.getDividendsAmount(
      inPortfolioCurrency
    );
    const totalInvested = this.investment.getTotalInvested(inPortfolioCurrency);

    const yoc = (dividendsAmount / totalInvested) * 100;
    return yoc;
  }
}

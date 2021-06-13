import { ICompanyDividends } from "types/company-parts/dividends-part/dividends-part";
import { ICompanyInvestment } from "types/company-parts/investment-part/investment-part";
import { ICompanyRpd } from "types/company-parts/rpd-part/rpd-part";
import { IDividendsTransaction } from "types/dividends-transaction";
import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";
import { CompanyDividends } from "../dividends-part/company-dividends";
import { CompanyInvestment } from "../investment-part/company-investment";

export class CompanyRpd implements ICompanyRpd {
  dividends: ICompanyDividends;
  investment: ICompanyInvestment;

  constructor(
    dividendsTransactions: IDividendsTransaction[],
    rightsTransactions: IRightsTransaction[],
    sharesTransactions: ISharesTransaction[]
  ) {
    this.dividends = new CompanyDividends(dividendsTransactions);
    this.investment = new CompanyInvestment(
      sharesTransactions,
      rightsTransactions
    );
  }

  getRpd(inPortfolioCurrency = false): number {
    const dividendsAmount = this.dividends.getDividendsAmount(
      inPortfolioCurrency
    );
    const totalInvested = this.investment.getTotalInvested(inPortfolioCurrency);

    const rpd = (dividendsAmount / totalInvested) * 100;
    return rpd;
  }
}

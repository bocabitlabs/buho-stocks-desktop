import { IRightsTransaction } from "types/rights-transaction";
import { ISharesTransaction } from "types/shares-transaction";

export interface ICompanyInvestment {
  sharesTransactions: ISharesTransaction[];
  rightsTransactions: IRightsTransaction[];
  getTotalInvested(inPortfolioCurrency?: boolean): number;
  getTotalInvestedUntilYear(
    year: string,
    inPortfolioCurrency?: boolean
  ): number;
  getTotalInvestedOnYear(year: string, inPortfolioCurrency?: boolean): number;
}

import { ISharesTransaction } from "types/shares-transaction";

export interface ICompanyShares {
  sharesTransactions: ISharesTransaction[];
  getSharesCount: Function;
  getSharesCountForYear(year: string): number;
  getCumulativeSharesCountUntilYear(year: string): number;
}
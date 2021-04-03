import { Transaction, TransactionType } from "./transaction";

export interface SharesTransactionFormProps extends Transaction {
  type: TransactionType;
}

export interface SharesTransaction extends SharesTransactionFormProps{
  id: string;
  currencyName?: string;
  currencySymbol?: string;
}

export interface YearlyShareFields {
  year: string;
  companyId: string;
  sharesBought: number;
  sharesSold: number;
  investedAmount: number;
  investedAmountBaseCurrency: number;
  soldAmount: number;
  soldAmountBaseCurrency: number;
  investmentCommission: number;
  sellCommission: number;
  operationsCount: number;
}

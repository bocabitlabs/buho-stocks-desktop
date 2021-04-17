import { Transaction, TransactionType } from "./transaction";

export interface SharesTransactionFormProps extends Transaction {
  type: TransactionType;
}

export interface ISharesTransaction extends SharesTransactionFormProps{
  id: string;
  currencyName?: string;
  currencySymbol?: string;
}

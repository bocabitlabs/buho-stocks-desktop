import { Transaction, TransactionType } from "./transaction";

export interface RightsTransactionFormProps extends Transaction {
  type: TransactionType;
}

export interface RightsTransaction extends RightsTransactionFormProps {
  id?: string;
  currencyName?: string;
  currencySymbol?: string;
}

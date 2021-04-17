import { Transaction } from "./transaction";

export interface DividendsTransactionFormProps extends Transaction {
}

export interface IDividendsTransaction extends DividendsTransactionFormProps{
  id: string;
  currencyName?: string;
  currencySymbol?: string;
}

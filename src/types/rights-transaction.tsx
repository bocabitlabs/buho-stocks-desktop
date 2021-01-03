import { TransactionType } from "./transaction-type";

export interface RightsTransactionFormProps {
  count: number;
  price: number;
  operationCommission: number;
  type: TransactionType;
  exchangeRate: number;
  operationDate: string;
  companyId: string;
  color: string;
  notes: string;
}

export interface RightsTransaction extends RightsTransactionFormProps {
  id?: string;
  currencyName?: string;
  currencySymbol?: string;
}

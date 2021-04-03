export interface Transaction {
  count: number;
  price: number;
  commission: number;
  exchangeRate: number;
  transactionDate: string;
  companyId: string;
  color: string;
  notes: string;
}

export enum TransactionType {
  BUY = "BUY",
  SELL = "SELL"
}
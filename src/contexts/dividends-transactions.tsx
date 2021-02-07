import { createContext } from "react";
import { IAddProps } from "types/common";
import { DividendsTransaction, DividendsTransactionFormProps } from "types/dividends-transaction";

export type DividendsTransactionsContextType = {
  dividendsTransaction: DividendsTransaction|null;
  dividendsTransactions: DividendsTransaction[];
  isLoading: boolean;
  create: (transaction: DividendsTransactionFormProps) => IAddProps;
  deleteById: (transactionId: string) => IAddProps,
  fetchAll: () => void;
  getById: (transactionId: string) => DividendsTransaction|null;
  update: (transactionId: string, transaction: DividendsTransactionFormProps) => IAddProps
};

export const dividendsTransactionsDefaultValue: DividendsTransactionsContextType = {
  dividendsTransaction: null,
  dividendsTransactions: [],
  isLoading: false,
  create: () => ({changes: false}),
  deleteById: () => ({changes: false}),
  fetchAll: () => null,
  getById: (transactionId: string) => null,
  update: () => ({changes: false})
};

export const DividendsTransactionsContext = createContext<DividendsTransactionsContextType>(
  dividendsTransactionsDefaultValue
);
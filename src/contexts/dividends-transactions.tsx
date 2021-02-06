import { createContext } from "react";
import { IAddProps } from "types/common";
import { DividendsTransaction } from "types/dividends-transaction";

export type DividendsTransactionsContextType = {
  dividendsTransactions: DividendsTransaction[];
  isLoading: boolean;
  fetchAll: () => void;
  add: (sharesTransaction: DividendsTransaction) => IAddProps;
  deleteById: (transactionId: string) => IAddProps
};

export const dividendsTransactionsDefaultValue: DividendsTransactionsContextType = {
  dividendsTransactions: [],
  isLoading: false,
  fetchAll: () => null,
  add: () => ({changes: false}),
  deleteById: () => ({changes: false})
};

export const DividendsTransactionsContext = createContext<DividendsTransactionsContextType>(
  dividendsTransactionsDefaultValue
);
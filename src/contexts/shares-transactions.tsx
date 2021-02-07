import { createContext } from "react";
import { IAddProps } from "types/common";
import {
  SharesTransaction,
  SharesTransactionFormProps
} from "types/shares-transaction";

export type SharesTransactionsContextType = {
  sharesTransaction: SharesTransaction | null;
  sharesTransactions: SharesTransaction[];
  isLoading: boolean;
  create: (transaction: SharesTransactionFormProps) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
  getAll: () => void;
  getById: (transactionId: string) => SharesTransaction|null;
  update: (
    transactionId: string,
    transaction: SharesTransactionFormProps
  ) => IAddProps;
};

export const sharesTransactionsDefaultValue: SharesTransactionsContextType = {
  sharesTransaction: null,
  sharesTransactions: [],
  isLoading: false,
  create: () => ({changes: false}),
  getAll: () => null,
  getById: (transactionId: string) => null,
  deleteById: () => ({ changes: false }),
  update: () => ({changes: false})
};

export const SharesTransactionsContext = createContext<SharesTransactionsContextType>(
  sharesTransactionsDefaultValue
);

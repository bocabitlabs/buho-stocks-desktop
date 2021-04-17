import { createContext } from "react";
import { IAddProps } from "types/common";
import {
  ISharesTransaction,
  SharesTransactionFormProps
} from "types/shares-transaction";

export type SharesTransactionsContextType = {
  sharesTransaction: ISharesTransaction | null;
  sharesTransactions: ISharesTransaction[];
  isLoading: boolean;
  create: (transaction: SharesTransactionFormProps) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
  getAll: () => void;
  getById: (transactionId: string) => ISharesTransaction|null;
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

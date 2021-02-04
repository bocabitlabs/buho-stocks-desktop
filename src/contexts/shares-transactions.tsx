import { createContext } from "react";
import { IAddProps } from "types/common";
import {
  SharesTransaction,
  SharesTransactionFormProps
} from "types/shares-transaction";

export type SharesTransactionsContextType = {
  sharesTransactions: SharesTransaction[];
  isLoading: boolean;
  fetchSharesTransactions: () => void;
  addSharesTransaction: (sharesTransaction: SharesTransactionFormProps) => IAddProps;
  deleteById: (transactionId: string) => IAddProps
};

export const sharesTransactionsDefaultValue: SharesTransactionsContextType = {
  sharesTransactions: [],
  isLoading: false,
  fetchSharesTransactions: () => null,
  addSharesTransaction: () => ({changes: false}),
  deleteById: () => ({changes: false})
};

export const SharesTransactionsContext = createContext<SharesTransactionsContextType>(
  sharesTransactionsDefaultValue
);

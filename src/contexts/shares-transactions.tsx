import { createContext } from "react";
import {
  SharesTransaction,
  SharesTransactionFormProps
} from "../types/shares-transaction";

export type SharesTransactionsContextType = {
  sharesTransactions: SharesTransaction[];
  isLoading: boolean;
  fetchSharesTransactions: () => void;
  addSharesTransaction: (sector: SharesTransactionFormProps) => void;
};

export const sharesTransactionsDefaultValue: SharesTransactionsContextType = {
  sharesTransactions: [],
  isLoading: false,
  fetchSharesTransactions: () => null,
  addSharesTransaction: () => null
};

export const SharesTransactionsContext = createContext<SharesTransactionsContextType>(
  sharesTransactionsDefaultValue
);

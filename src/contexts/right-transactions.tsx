import { createContext } from "react";
import {
  RightsTransaction,
  RightsTransactionFormProps
} from "types/rights-transaction";

export type RightTransactionsContextType = {
  rigthTransactions: RightsTransaction[];
  isLoading: boolean;
  fetchRightTransactions: () => void;
  addRightsTransaction: (rigthTransaction: RightsTransactionFormProps) => void;
};

export const rightTransactionDefaultValue: RightTransactionsContextType = {
  rigthTransactions: [],
  isLoading: false,
  fetchRightTransactions: () => null,
  addRightsTransaction: () => null
};

export const SharesContext = createContext<RightTransactionsContextType>(
  rightTransactionDefaultValue
);

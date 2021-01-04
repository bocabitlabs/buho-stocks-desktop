import { createContext } from "react";
import {
  RightsTransaction,
  RightsTransactionFormProps
} from "types/rights-transaction";

export type RightsTransactionsContextType = {
  rigthsTransactions: RightsTransaction[];
  isLoading: boolean;
  fetchRightsTransactions: () => void;
  addRightsTransaction: (rigthTransaction: RightsTransactionFormProps) => void;
};

export const rightsTransactionsDefaultValue: RightsTransactionsContextType = {
  rigthsTransactions: [],
  isLoading: false,
  fetchRightsTransactions: () => null,
  addRightsTransaction: () => null
};

export const RightsTransactionContext = createContext<RightsTransactionsContextType>(
  rightsTransactionsDefaultValue
);

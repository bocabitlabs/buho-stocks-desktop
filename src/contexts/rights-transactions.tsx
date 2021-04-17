import { createContext } from "react";
import { IAddProps } from "types/common";
import {
  IRightsTransaction,
  RightsTransactionFormProps
} from "types/rights-transaction";

export type RightsTransactionsContextType = {
  rightsTransaction: IRightsTransaction|null;
  rightsTransactions: IRightsTransaction[];
  isLoading: boolean;
  getAll: () => void;
  create: (rigthTransaction: RightsTransactionFormProps) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
  getById: (transactionId: string) => IRightsTransaction|null;
  update: (
    transactionId: string,
    transaction: RightsTransactionFormProps
  ) => IAddProps;
};

export const rightsTransactionsDefaultValue: RightsTransactionsContextType = {
  rightsTransaction: null,
  rightsTransactions: [],
  isLoading: false,
  create: () => ({changes: false}),
  getAll: () => null,
  getById: (transactionId: string) => null,
  deleteById: () => ({ changes: false }),
  update: () => ({changes: false})
};

export const RightsTransactionContext = createContext<RightsTransactionsContextType>(
  rightsTransactionsDefaultValue
);

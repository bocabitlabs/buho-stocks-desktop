import { createContext } from "react";
import { DividendsTransaction } from "types/dividends-transaction";

export type DividendsTransactionsContextType = {
  dividendsTransactions: DividendsTransaction[];
};

export const dividendsTransactionsDefaultValue: DividendsTransactionsContextType = {
  dividendsTransactions: []
};

export const DividendsTransactionsContext = createContext<DividendsTransactionsContextType>(
  dividendsTransactionsDefaultValue
);
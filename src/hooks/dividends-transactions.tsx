import { DividendsTransactionsContextType } from "contexts/dividends-transactions";
import { useState, useEffect } from "react";
import { DividendsTransaction } from "types/dividends-transaction";
import DividendService from "../services/dividends-transactions-service";

export function useDividendsTransactionsContext(
  companyId: string
): DividendsTransactionsContextType {
  const [dividendsTransactions, setDividendsTransactions] = useState<
    DividendsTransaction[]
  >([]);

  useEffect(() => {
    const results = new DividendService().getAll(companyId);
    setDividendsTransactions(results);
  }, [companyId]);

  return {
    dividendsTransactions
  };
}

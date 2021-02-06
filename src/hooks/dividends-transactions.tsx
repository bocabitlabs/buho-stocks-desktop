import { DividendsTransactionsContextType } from "contexts/dividends-transactions";
import { useState, useEffect, useCallback } from "react";
import {
  DividendsTransaction,
  DividendsTransactionFormProps
} from "types/dividends-transaction";
import DividendsTransactionsService from "../services/dividends-transactions-service";
import DividendService from "../services/dividends-transactions-service";

export function useDividendsTransactionsContext(
  companyId: string
): DividendsTransactionsContextType {
  const [dividendsTransactions, setDividendsTransactions] = useState<
    DividendsTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = DividendService.getAll(companyId);
    setDividendsTransactions(results);
  }, [companyId]);

  const fetchAll = useCallback(() => {
    setIsLoading(true);
    const results = DividendService.getAll(companyId);
    setDividendsTransactions(results);
    setIsLoading(true);
    return results;
  }, [companyId]);

  const add = useCallback(
    (sharesTransaction: DividendsTransactionFormProps) => {
      setIsLoading(true);
      const results = DividendsTransactionsService.add(sharesTransaction);
      setIsLoading(false);
      return results;
    },
    []
  );

  const deleteById = useCallback((transactionId: string) => {
    setIsLoading(true);
    const results = DividendsTransactionsService.deleteById(transactionId);
    setIsLoading(false);

    return results;
  }, []);

  return {
    add,
    dividendsTransactions,
    deleteById,
    fetchAll,
    isLoading
  };
}

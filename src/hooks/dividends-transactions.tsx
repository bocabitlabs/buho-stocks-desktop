import { DividendsTransactionsContextType } from "contexts/dividends-transactions";
import { useState, useEffect, useCallback } from "react";
import {
  IDividendsTransaction,
  DividendsTransactionFormProps
} from "types/dividends-transaction";
import DividendsTransactionsService from "../services/dividends-transactions-service";
import DividendService from "../services/dividends-transactions-service";

export function useDividendsTransactionsContext(
  companyId: string
): DividendsTransactionsContextType {
  const [
    dividendsTransaction,
    setDividendsTransaction
  ] = useState<IDividendsTransaction | null>(null);
  const [dividendsTransactions, setDividendsTransactions] = useState<
  IDividendsTransaction[]
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

  const create = useCallback(
    (transaction: DividendsTransactionFormProps) => {
      setIsLoading(true);
      const results = DividendsTransactionsService.create(transaction);
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

  const getById = useCallback((transactionId: string) => {
    setIsLoading(true);
    const result = DividendsTransactionsService.getById(transactionId);
    setDividendsTransaction(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback((transactionId: string, transaction: DividendsTransactionFormProps) => {
    setIsLoading(true);
    const result = DividendsTransactionsService.update(transactionId, transaction);
    // setDividendsTransaction(result);
    setIsLoading(false);
    return result;
  }, []);

  return {
    create,
    dividendsTransaction,
    dividendsTransactions,
    deleteById,
    fetchAll,
    getById,
    isLoading,
    update
  };
}

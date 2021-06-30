import { DividendsTransactionsContextType } from "contexts/dividends-transactions";
import { useState, useEffect, useCallback } from "react";
import {
  IDividendsTransaction,
  DividendsTransactionFormProps
} from "types/dividends-transaction";
import DividendsTransactionsService from "services/dividends-transactions/dividends-transactions-service";

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
    let results = DividendsTransactionsService.getAll(companyId);
    if (results === undefined) {
      results = [];
    }
    setDividendsTransactions(results);
  }, [companyId]);

  const getAll = useCallback(() => {
    setIsLoading(true);
    const results = DividendsTransactionsService.getAll(companyId);
    setDividendsTransactions(results);
    setIsLoading(true);
    return results;
  }, [companyId]);

  const create = useCallback((transaction: DividendsTransactionFormProps) => {
    setIsLoading(true);
    const results = DividendsTransactionsService.create(transaction);
    setIsLoading(false);
    return results;
  }, []);

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

  const update = useCallback(
    (transactionId: string, transaction: DividendsTransactionFormProps) => {
      setIsLoading(true);
      const result = DividendsTransactionsService.update(
        transactionId,
        transaction
      );
      // setDividendsTransaction(result);
      setIsLoading(false);
      return result;
    },
    []
  );

  return {
    create,
    dividendsTransaction,
    dividendsTransactions,
    deleteById,
    getAll,
    getById,
    isLoading,
    update
  };
}

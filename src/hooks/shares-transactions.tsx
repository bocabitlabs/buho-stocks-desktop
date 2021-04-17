import { useState, useEffect, useCallback } from "react";
import {
  ISharesTransaction,
  SharesTransactionFormProps
} from "types/shares-transaction";
import { SharesTransactionsContextType } from "contexts/shares-transactions";
import SharesTransactionsService from "services/shares-transactions-service/shares-transactions-service";

export function useSharesTransactionsContext(
  companyId: string
): SharesTransactionsContextType {
  const [
    sharesTransaction,
    setSharesTransaction
  ] = useState<ISharesTransaction | null>(null);
  const [sharesTransactions, setSharesTransactions] = useState<
  ISharesTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = SharesTransactionsService.getAll(companyId);
    setSharesTransactions(results);
  }, [companyId]);

  const create = useCallback((transaction: SharesTransactionFormProps) => {
    setIsLoading(true);
    const results = SharesTransactionsService.create(transaction);
    setIsLoading(false);
    return results;
  }, []);

  const getAll = useCallback(() => {
    setIsLoading(true);
    const results = SharesTransactionsService.getAll(companyId);
    setSharesTransactions(results);
    setIsLoading(false);
  }, [companyId]);

  const deleteById = useCallback((transactionId: string) => {
    setIsLoading(true);
    const results = SharesTransactionsService.deleteById(transactionId);
    setIsLoading(false);
    return results;
  }, []);

  const getById = useCallback((transactionId: string) => {
    setIsLoading(true);
    const result = SharesTransactionsService.getById(transactionId);
    setSharesTransaction(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback((transactionId: string, transaction: SharesTransactionFormProps) => {
    setIsLoading(true);
    const result = SharesTransactionsService.update(transactionId, transaction);
    setIsLoading(false);
    return result;
  }, []);

  return {
    sharesTransaction,
    sharesTransactions,
    isLoading,
    create,
    deleteById,
    getAll,
    getById,
    update
  };
}

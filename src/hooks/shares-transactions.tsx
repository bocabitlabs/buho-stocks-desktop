import { useState, useEffect, useCallback } from "react";
import {
  SharesTransaction,
  SharesTransactionFormProps
} from "types/shares-transaction";
import { SharesTransactionsContextType } from "contexts/shares-transactions";
import SharesTransactionsService from "services/shares-transactions-service";

export function useSharesTransactionsContext(
  companyId: string
): SharesTransactionsContextType {
  const [sharesTransactions, setSharesTransactions] = useState<
    SharesTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = SharesTransactionsService.getShares(companyId);
    setSharesTransactions(results);
  }, [companyId]);

  const fetchSharesTransactions = useCallback(() => {
    setIsLoading(true);
    const results = SharesTransactionsService.getShares(companyId);
    setSharesTransactions(results);
  }, [companyId]);

  const addSharesTransaction = useCallback(
    (sharesTransaction: SharesTransactionFormProps) => {
      setIsLoading(true);
      const results = SharesTransactionsService.addSharesTransaction(
        sharesTransaction
      );
      setIsLoading(false);
      return results;
    },
    []
  );

  const deleteById = useCallback((transactionId: string) => {
    setIsLoading(true);
    const results = SharesTransactionsService.deleteById(transactionId);
    return results;
  }, []);

  return {
    sharesTransactions,
    isLoading,
    fetchSharesTransactions,
    addSharesTransaction,
    deleteById
  };
}

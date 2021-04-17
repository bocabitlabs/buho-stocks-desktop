import { RightsTransactionsContextType } from "contexts/rights-transactions";
import { useState, useEffect, useCallback } from "react";
import RightsTransactionsService from "services/rights-transactions-service/rights-transactions-service";
import {
  RightsTransaction,
  RightsTransactionFormProps
} from "types/rights-transaction";

export function useRightsTransactionsContext(
  companyId: string
): RightsTransactionsContextType {
  const [
    rightsTransaction,
    setRightsTransaction
  ] = useState<RightsTransaction | null>(null);
  const [rightsTransactions, setRightsTransactions] = useState<
    RightsTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = RightsTransactionsService.getAll(companyId);
    setRightsTransactions(results);
  }, [companyId]);

  const create = useCallback((transaction: RightsTransactionFormProps) => {
    setIsLoading(true);
    const results = RightsTransactionsService.create(transaction);
    setIsLoading(false);
    return results;
  }, []);

  const deleteById = useCallback((transactionId: string) => {
    setIsLoading(true);
    const results = RightsTransactionsService.deleteById(transactionId);
    setIsLoading(false);
    return results;
  }, []);

  const getAll = useCallback(() => {
    setIsLoading(true);
    const results = RightsTransactionsService.getAll(companyId);
    setRightsTransactions(results);
    setIsLoading(false);
  }, [companyId]);

  const getById = useCallback((transactionId: string) => {
    setIsLoading(true);
    const result = RightsTransactionsService.getById(transactionId);
    setRightsTransaction(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback(
    (transactionId: string, transaction: RightsTransactionFormProps) => {
      setIsLoading(true);
      console.debug("Update rights transaction...");
      const result = RightsTransactionsService.update(
        transactionId,
        transaction
      );
      setIsLoading(false);
      return result;
    },
    []
  );

  return {
    rightsTransaction,
    rightsTransactions,
    isLoading,
    create,
    deleteById,
    getAll,
    getById,
    update
  };
}

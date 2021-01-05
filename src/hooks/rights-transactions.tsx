import { RightsTransactionsContextType } from "contexts/right-transactions";
import { useState, useEffect, useCallback } from "react";
import RightsTransactionsService from "services/rights-transactions-service";
import { RightsTransaction } from "types/rights-transaction";

export function useRightsTransactionsContext(
  companyId: string
): RightsTransactionsContextType {
  const [rigthsTransactions, setRightsTransactions] = useState<
    RightsTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = RightsTransactionsService.getRights(companyId);
    setRightsTransactions(results);
  }, [companyId]);

  const fetchRightsTransactions = useCallback(() => {
    setIsLoading(true);
    const results = RightsTransactionsService.getRights(companyId);
    setRightsTransactions(results);
  }, [companyId]);

  const addRightsTransaction = useCallback(
    (transaction: RightsTransaction) => {
      setIsLoading(true);
      const results = RightsTransactionsService.getRights(companyId);
      setRightsTransactions(results);
    },
    [companyId]
  );

  return {
    rigthsTransactions,
    isLoading,
    fetchRightsTransactions,
    addRightsTransaction
  };
}
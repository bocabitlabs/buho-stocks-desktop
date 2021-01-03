import { RightTransactionsContextType } from "contexts/right-transactions";
import { useState, useEffect, useCallback } from "react";
import { RightsTransaction } from "types/rights-transaction";

export function useRightsTransactionsContext(
  companyId: string
): RightTransactionsContextType {
  const [rigthTransactions, setRightTransactions] = useState<
    RightsTransaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // const results = new ShareRightService().getShares(companyId);
    // setShares(results);
    //TODO: Finish this
  }, [companyId]);

  const fetchRightTransactions = useCallback(() => {
    setIsLoading(true);
    // const results = new ShareRightService().getShares(companyId);
    // setShares(results);
    //TODO: Finish this
  }, [companyId]);

  const addRightsTransaction = useCallback(
    (transaction: RightsTransaction) => {
      setIsLoading(true);
      // const results = new ShareService().getShares(companyId);
      // setShares(results);
      //TODO: Finish this
    },
    [companyId]
  );

  return {
    rigthTransactions,
    isLoading,
    fetchRightTransactions,
    addRightsTransaction
  };
}

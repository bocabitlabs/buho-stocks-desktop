import { useState, useEffect, useCallback } from "react";
import { SharesContextType } from "../contexts/shares";
import ShareService from "../services/share-service";
import { ShareFields, ShareItemProps } from "../types/share";

export function useSharesContext(companyId: string): SharesContextType {
  const [shares, setShares] = useState<ShareFields[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const results = new ShareService().getShares(companyId);
    setShares(results);
  }, [companyId])

  const fetchShares = useCallback(() => {
    setIsLoading(true);
    const results = new ShareService().getShares(companyId);
    setShares(results);
  }, [companyId]);

  const addShare = useCallback(
    (sector: ShareItemProps) => {
      setIsLoading(true);
      const results = new ShareService().getShares(companyId);
      setShares(results);
    },
    [companyId]
  );

  return {
    shares,
    isLoading,
    fetchShares,
    addShare
  };
}

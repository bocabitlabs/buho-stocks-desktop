import { useState, useCallback } from "react";
import { SharesContextType } from "../contexts/shares";
import { getShares, addShare as addShareDAO } from "../daos/share-dao";
import { ShareFields, ShareItemProps } from "../types/share";

export function useSharesContext(): SharesContextType {
  const [shares, setShares] = useState<ShareFields[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchShares = useCallback((companyId: string) => {
    setIsLoading(true);
    getShares(companyId, getCallback);
  }, [])

  const getCallback = (result: ShareFields[]) => {
    setShares(result)
    setIsLoading(false);
  };

  const addShare = useCallback((share: ShareItemProps) => {

    const addShareCallback = (result: []) => {
      fetchShares(share.companyId)
      console.log(result);
      setIsLoading(false);
    };

    setIsLoading(true);
    addShareDAO(share, addShareCallback);
  }, [fetchShares])

  return {
    shares,
    isLoading,
    fetchShares,
    addShare
  }
}
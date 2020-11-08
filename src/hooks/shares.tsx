import { useState, useCallback } from "react";
import { SharesContextType } from "../contexts/shares";
import ShareService from "../services/share-service";
import { ShareFields, ShareItemProps } from "../types/share";

export function useSharesContext(): SharesContextType {
  const [shares, setShares] = useState<ShareFields[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchShares = useCallback((companyId: string) => {
    setIsLoading(true);
    new ShareService().getShares(companyId, getCallback);
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
    new ShareService().addShare(share, addShareCallback);
  }, [fetchShares])

  return {
    shares,
    isLoading,
    fetchShares,
    addShare
  }
}
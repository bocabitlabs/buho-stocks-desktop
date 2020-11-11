import { useState, useCallback } from "react";
import { SharesContextType } from "../contexts/shares";
import ShareService from "../services/share-service";
import { ShareFields } from "../types/share";

export function useSharesContext(): SharesContextType {
  const [shares, setShares] = useState<ShareFields[]>([]);

  const fetchShares = useCallback((companyId: string) => {
    const results = new ShareService().getShares(companyId);
    setShares(results);
  }, []);

  return {
    shares,
    fetchShares
  };
}

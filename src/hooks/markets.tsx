import { useState, useCallback } from "react";
import { MarketsContextType } from "../contexts/markets";
import MarketService from "../services/market-service";
import { MarketFields } from "../types/market";

export function useMarketsContext(): MarketsContextType {
  const [markets, setMarkets] = useState<MarketFields[]>([]);

  const fetchMarkets = useCallback(() => {
    console.log("fetching markets")
    const result = new MarketService().getMarkets();
    setMarkets(result)
  }, []);

  return {
    markets,
    fetchMarkets
  };
}

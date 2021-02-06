import { useState, useEffect, useCallback } from "react";
import { MarketsContextType } from "contexts/markets";
import MarketService from "services/market-service";
import { Market, MarketFormProps } from "types/market";

export function useMarketsContext(): MarketsContextType {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const result = MarketService.getMarkets();
    setMarkets(result);
  }, []);


  const fetchMarkets = useCallback(() => {
    console.log("fetching markets");
    setIsLoading(true);
    const result = MarketService.getMarkets();
    setMarkets(result);
    setIsLoading(false);
  }, []);

  const addMarket = useCallback((market: MarketFormProps) => {
    setIsLoading(true);
    const result = MarketService.addMarket(market);
    if (result.changes) {
      const result = MarketService.getMarkets();
      setMarkets(result);
    }
  }, []);

  return {
    markets,
    isLoading,
    fetchMarkets,
    addMarket
  };
}

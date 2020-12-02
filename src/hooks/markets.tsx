import { useState, useEffect, useCallback } from "react";
import { MarketsContextType } from "../contexts/markets";
import MarketService from "../services/market-service";
import { MarketFields, MarketItemProps } from "../types/market";

export function useMarketsContext(): MarketsContextType {
  const [markets, setMarkets] = useState<MarketFields[]>([]);

  useEffect(() => {
    const result = new MarketService().getMarkets();
    setMarkets(result)
  }, [])

  const [isLoading, setIsLoading] = useState(false);

  const fetchMarkets = useCallback(() => {
    console.log("fetching markets")
    setIsLoading(true);
    const result = new MarketService().getMarkets();
    setMarkets(result)
    setIsLoading(false);
  }, []);

  const addMarket = useCallback(
    (market: MarketItemProps) => {

      setIsLoading(true);
      const result = new MarketService().addMarket(market);
      if(result.changes){
        const result = new MarketService().getMarkets();
        setMarkets(result)
      }
    },
    []
  );

  return {
    markets,
    isLoading,
    fetchMarkets,
    addMarket
  };
}

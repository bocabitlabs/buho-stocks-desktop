import { useState, useEffect, useCallback } from "react";
import { MarketsContextType } from "contexts/markets";
import MarketService from "services/market-service";
import { Market, MarketFormProps } from "types/market";

export function useMarketsContext(): MarketsContextType {
  const [market, setMarket] = useState<Market|null>(null);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const result = MarketService.getMarkets();
    setMarkets(result);
  }, []);


  const fetchMarkets = useCallback(() => {
    console.debug("fetching markets");
    setIsLoading(true);
    const result = MarketService.getMarkets();
    setMarkets(result);
    setIsLoading(false);
  }, []);

  const addMarket = useCallback((market: MarketFormProps) => {
    setIsLoading(true);
    const result = MarketService.addMarket(market);
    setIsLoading(false);
    return result
  }, []);

  const getById = useCallback((id: string) => {
    setIsLoading(true);
    const result = MarketService.getById(id);
    setMarket(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback((id: string, market: MarketFormProps) => {
    setIsLoading(true);
    const result = MarketService.update(id, market);
    setIsLoading(false);
    return result;
  }, []);

  return {
    market,
    markets,
    isLoading,
    fetchMarkets,
    addMarket,
    getById,
    update
  };
}

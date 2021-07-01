import { useState, useEffect, useCallback } from "react";
import { ExchangeRatesContextType } from "contexts/exchange-rates";
import { IExchangeRate, IExchangeRateForm } from "types/exchange-rate";
import ExchangeRatesService from "services/exchange-rates/exchange-rates-service";

export function useExchangeRatesContext(): ExchangeRatesContextType {
  const [exchangeRates, setExchangeRates] = useState<IExchangeRate[]>([]);
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const results = ExchangeRatesService.getAll();
    setExchangeRates(results);
  }, []);

  const create = useCallback((exchangeRate: IExchangeRateForm) => {
    setIsLoading(true);
    const result = ExchangeRatesService.create(exchangeRate);
    setExchangeRate(result);
    return result;
  }, []);

  const getAll = useCallback(() => {
    setIsLoading(true);
    const results = ExchangeRatesService.getAll();
    setExchangeRates(results);
    setIsLoading(false);
    return results;
  }, []);

  const get = useCallback((transactionDate: string, exchangeName: string) => {
    setIsLoading(true);
    const result = ExchangeRatesService.get(transactionDate, exchangeName);
    setExchangeRate(result);
    setIsLoading(false);
    return result;
  }, []);

  return {
    exchangeRates,
    exchangeRate,
    isLoading,
    getAll,
    create,
    get
  };
}

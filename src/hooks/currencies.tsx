import { useState, useCallback } from "react";
import { CurrenciesContextType } from "../contexts/currencies";
import CurrencyService from "../services/currency-service";
import { CurrencyFields, CurrencyItemProps } from "../types/currency";

export function useCurrenciesContext(): CurrenciesContextType {
  const [currencies, setCurrencies] = useState<CurrencyFields[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrencies = useCallback(() => {
    setIsLoading(true);
    new CurrencyService().getCurrencies(getCallback);
  }, []);

  const getCallback = (result: CurrencyFields[]) => {
    setCurrencies(result);
    setIsLoading(false);
  };

  const addCurrency = useCallback(
    (currency: CurrencyItemProps) => {
      const addCurrenciesCallback = (result: []) => {
        fetchCurrencies();
        console.log(result);
        setIsLoading(false);
      };

      setIsLoading(true);
      new CurrencyService().addCurrency(currency, addCurrenciesCallback);
    },
    [fetchCurrencies]
  );

  return {
    currencies,
    isLoading,
    fetchCurrencies,
    addCurrency
  };
}

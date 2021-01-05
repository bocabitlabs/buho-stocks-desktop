import { useState, useEffect, useCallback } from "react";
import { CurrenciesContextType } from "contexts/currencies";
import CurrencyService from "services/currency-service";
import { Currency, CurrencyFormFields } from "types/currency";

export function useCurrenciesContext(): CurrenciesContextType {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const currencies = new CurrencyService().getCurrencies();
    setCurrencies(currencies);
    setIsLoading(false);
  }, []);

  const fetchCurrencies = useCallback(() => {
    setIsLoading(true);
    const currencies = new CurrencyService().getCurrencies();
    setCurrencies(currencies);
    setIsLoading(false);
  }, []);

  const addCurrency = useCallback((currency: CurrencyFormFields) => {
    setIsLoading(true);
    const result = new CurrencyService().addCurrency(currency);
    setIsLoading(false);
    return result;
  }, []);

  return {
    currencies,
    isLoading,
    fetchCurrencies,
    addCurrency
  };
}

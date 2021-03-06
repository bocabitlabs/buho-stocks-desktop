import { useState, useEffect, useCallback } from "react";
import { CurrenciesContextType } from "contexts/currencies";
import CurrencyService from "services/currency-service";
import { Currency, CurrencyFormFields } from "types/currency";

export function useCurrenciesContext(): CurrenciesContextType {
  const [currency, setCurrency] = useState<Currency|null>(null);
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
    const result = CurrencyService.addCurrency(currency);
    setIsLoading(false);
    return result;
  }, []);

  const getById = useCallback((id: string) => {
    setIsLoading(true);
    const result = CurrencyService.getById(id);
    setCurrency(result);
    setIsLoading(false);
    return result;
  }, []);

  const update = useCallback((companyId: string, company: CurrencyFormFields) => {
    setIsLoading(true);
    const result = CurrencyService.update(companyId, company);
    setIsLoading(false);
    return result;
  }, []);

  return {
    currency,
    currencies,
    isLoading,
    fetchCurrencies,
    addCurrency,
    getById,
    update
  };
}

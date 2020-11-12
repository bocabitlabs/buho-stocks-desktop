import { useState, useEffect } from "react";
import { CurrenciesContextType } from "../contexts/currencies";
import CurrencyService from "../services/currency-service";
import { CurrencyFields } from "../types/currency";

export function useCurrenciesContext(): CurrenciesContextType {
  const [currencies, setCurrencies] = useState<CurrencyFields[]>([]);

  useEffect(() => {
    const currencies = new CurrencyService().getCurrencies();
    setCurrencies(currencies);
  }, []);

  return {
    currencies
  };
}

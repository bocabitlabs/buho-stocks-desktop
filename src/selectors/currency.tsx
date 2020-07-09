import { CurrencyFields } from "../types/currency";

export const getCurrencies = (state: { currencies: CurrencyFields[] }) =>
  state.currencies;

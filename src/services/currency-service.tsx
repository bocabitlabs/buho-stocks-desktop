import CurrencyDAO from "../database/daos/currency-dao";
import { CurrencyItemProps } from "../types/currency";

export default class CurrencyService {
  addCurrency = (currency: CurrencyItemProps) => {
    return new CurrencyDAO().addCurrency(currency);
  };

  getCurrencies = () => {
    return new CurrencyDAO().getCurrencies();
  };

  deleteById = (currencyId: string) => {
    return new CurrencyDAO().deleteById(currencyId);
  };
}

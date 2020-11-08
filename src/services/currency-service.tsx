import CurrencyDAO from "../database/daos/currency-dao";
import { CurrencyItemProps } from "../types/currency";

export default class CurrencyService {
  addCurrency = (currency: CurrencyItemProps, callback: Function) => {
    new CurrencyDAO().addCurrency(currency, callback);
  };

  getCurrencies = async (callback: Function) => {
    new CurrencyDAO().getCurrencies(callback);
  };
}

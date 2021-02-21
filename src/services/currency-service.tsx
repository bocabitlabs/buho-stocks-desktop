import CurrencyDAO from "database/daos/currency-dao";
import { Currency, CurrencyFormFields } from "types/currency";

export default class CurrencyService {
  static addCurrency = (currency: CurrencyFormFields) => {
    return CurrencyDAO.addCurrency(currency);
  };

  exportAll = (): Currency[] => {
    const results = CurrencyDAO.exportAll();
    return results;
  };

  static getByName = (name: string) => {
    return CurrencyDAO.getByName(name);
  };

  getCurrencies = () => {
    return CurrencyDAO.getCurrencies();
  };

  deleteById = (currencyId: string) => {
    return CurrencyDAO.deleteById(currencyId);
  };
}

import CurrencyDAO from "database/daos/currency-dao";
import { Currency, CurrencyFormFields } from "types/currency";

export default class CurrencyService {
  addCurrency = (currency: CurrencyFormFields) => {
    return CurrencyDAO.addCurrency(currency);
  };

  exportAll = (): Currency[] => {
    const results = CurrencyDAO.exportAll();
    return results;
  };

  getCurrencies = () => {
    return CurrencyDAO.getCurrencies();
  };

  deleteById = (currencyId: string) => {
    return CurrencyDAO.deleteById(currencyId);
  };
}

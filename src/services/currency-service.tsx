import CurrencyDAO from "database/daos/currency-dao";
import { CurrencyFormFields } from "types/currency";

export default class CurrencyService {
  addCurrency = (currency: CurrencyFormFields) => {
    return CurrencyDAO.addCurrency(currency);
  };

  getCurrencies = () => {
    return CurrencyDAO.getCurrencies();
  };

  deleteById = (currencyId: string) => {
    return CurrencyDAO.deleteById(currencyId);
  };
}

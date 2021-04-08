import CurrencyDAO from "database/daos/currency-dao/currency-dao";
import { ICurrency, CurrencyFormFields } from "types/currency";

export default class CurrencyService {
  static create = (currency: CurrencyFormFields) => {
    return CurrencyDAO.create(currency);
  };

  static exportAll = (): ICurrency[] => {
    const results = CurrencyDAO.exportAll();
    return results;
  };

  static getByName = (name: string) => {
    return CurrencyDAO.getByName(name);
  };

  static getAll = () => {
    return CurrencyDAO.getAll();
  };

  static getById = (currencyId: string) => {
    return CurrencyDAO.getById(currencyId);
  };

  static deleteById = (currencyId: string) => {
    return CurrencyDAO.deleteById(currencyId);
  };

  static update = (id: string, currency: CurrencyFormFields) => {
    return CurrencyDAO.update(id, currency);
  };
}

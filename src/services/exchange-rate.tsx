import ExchangeRateDAO from "database/daos/exchange-rate";
import { IExchangeRateForm } from "types/exchange-rate";

export default class ExchangeRateService {
  static add = (item: IExchangeRateForm) => {
    return ExchangeRateDAO.add(item);
  };

  static getAll = () => {
    return ExchangeRateDAO.getAll();
  };

  static get = (transactionDate: string, exchangeName: string) => {
    return ExchangeRateDAO.get(transactionDate, exchangeName);
  };

  static deleteById = (itemId: string) => {
    return ExchangeRateDAO.deleteById(itemId);
  };
}

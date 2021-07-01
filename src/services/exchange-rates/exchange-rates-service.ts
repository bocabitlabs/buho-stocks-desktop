import ExchangeRateDAO from "database/daos/exchange-rate-dao/exchange-rate-dao";
import { IExchangeRateForm } from "types/exchange-rate";

export default class ExchangeRatesService {
  static create = (item: IExchangeRateForm) => {
    return ExchangeRateDAO.create(item);
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

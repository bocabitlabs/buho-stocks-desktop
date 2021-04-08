import MarketDAO from "database/daos/market-dao/market-dao";
import { IMarket, MarketFormProps } from "types/market";

export default class MarketService {
  static create = (market: MarketFormProps) => {
    return MarketDAO.create(market);
  };

  exportAll = (): IMarket[] => {
    const results = MarketDAO.exportAll();
    return results;
  };

  static getByName = (name: string) => {
    return MarketDAO.getByName(name);
  };

  static getById = (id: string) => {
    return MarketDAO.getById(id);
  };

  static getAll = () => {
    return MarketDAO.getAll();
  };

  static deleteById = (marketId: string) => {
    return MarketDAO.deleteById(marketId);
  };

  static update = (id: string, market: MarketFormProps) => {
    return MarketDAO.update(id, market);
  };
}

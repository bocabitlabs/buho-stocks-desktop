import MarketDAO from "database/daos/market-dao";
import { Market, MarketFormProps } from "types/market";

export default class MarketService {
  static addMarket = (market: MarketFormProps) => {
    return MarketDAO.addMarket(market);
  };

  exportAll = (): Market[] => {
    const results = MarketDAO.exportAll();
    return results;
  };

  static getByName = (name: string) => {
    return MarketDAO.getByName(name);
  };

  static getById = (id: string) => {
    return MarketDAO.getById(id);
  };

  static getMarkets = () => {
    return MarketDAO.getMarkets();
  };

  static deleteById = (marketId: string) => {
    return MarketDAO.deleteById(marketId);
  };

  static update = (id: string, market: MarketFormProps) => {
    return MarketDAO.update(id, market);
  };
}

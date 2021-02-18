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

  static getMarkets = () => {
    return MarketDAO.getMarkets();
  };

  static deleteById = (marketId: string) => {
    return MarketDAO.deleteById(marketId);
  };
}

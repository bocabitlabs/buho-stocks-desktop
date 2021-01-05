import MarketDAO from "database/daos/market-dao";
import { MarketFormProps } from "types/market";

export default class MarketService {
  static addMarket = (market: MarketFormProps) => {
    return MarketDAO.addMarket(market);
  };

  static getMarkets = () => {
    return MarketDAO.getMarkets();
  };

  static deleteById = (marketId: string) => {
    return MarketDAO.deleteById(marketId);
  };
}

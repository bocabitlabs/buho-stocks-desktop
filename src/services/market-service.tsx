import MarketDAO from "database/daos/market-dao";
import { MarketFormProps } from "types/market";

export default class MarketService {
  static addMarket = (market: MarketFormProps) => {
    return new MarketDAO().addMarket(market);
  };

  static getMarkets = () => {
    return new MarketDAO().getMarkets();
  };

  static deleteById = (marketId: string) => {
    return new MarketDAO().deleteById(marketId);
  };
}

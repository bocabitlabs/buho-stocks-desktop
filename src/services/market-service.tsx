import MarketDAO from "../database/daos/market-dao";
import { MarketItemProps } from "../types/market";

export default class MarketService {
  addMarket = (market: MarketItemProps) => {
    return new MarketDAO().addMarket(market);
  };

  getMarkets = () => {
    return new MarketDAO().getMarkets();
  };

  deleteMarketById = (marketId: string) => {
    return new MarketDAO().deleteMarketById(marketId);
  };
}

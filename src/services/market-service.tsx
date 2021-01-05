import MarketDAO from "database/daos/market-dao";
import { MarketFormProps } from "types/market";

export default class MarketService {
  addMarket = (market: MarketFormProps) => {
    return new MarketDAO().addMarket(market);
  };

  getMarkets = () => {
    return new MarketDAO().getMarkets();
  };

  deleteById = (marketId: string) => {
    return new MarketDAO().deleteById(marketId);
  };
}

import MarketDAO from "../database/daos/market-dao";
import { MarketItemProps } from "../types/market";

export default class MarketService {
  addMarket = (market: MarketItemProps, callback: Function) => {
    new MarketDAO().addMarket(market, callback);
  };

  getMarkets = async (callback: Function) => {
    new MarketDAO().getMarkets(callback);
  };
}

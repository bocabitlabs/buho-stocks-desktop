import sendIpcSql from "../../message-control/renderer";
import { MarketItemProps } from "../../types/market";

export default class MarketOperations {
  addMarket = (market: MarketItemProps) => {
    //Call the DB
    const sql = `INSERT INTO "markets"
    ("name", "description", "region", "openTime", "closeTime", "color")
    VALUES ('${market.name}', '${market.description}', '${market.region}', '${market.openTime}', '${market.closeTime}', '${market.color}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    return results;
  };
  getMarkets = () => {
    //Call the DB
    console.log("Get all markets");
    const sql = `SELECT * FROM markets`;
    const results = sendIpcSql(sql);
    console.log(results);
    return results;
  };
  deleteMarketById = (marketId: string) => {
    //Call the DB
    console.log("Delete market by ID");
    const sql = `DELETE FROM markets WHERE "id" = '${marketId}'`;
    const results = sendIpcSql(sql, "delete");
    console.log(results);
    return results;
  };
}

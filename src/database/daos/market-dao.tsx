import sendIpcSql from "../../message-control/renderer";
import { MarketItemProps } from "../../types/market";

export default class MarketOperations {
  addMarket = (market: MarketItemProps, callback: Function) => {
    //Call the DB
    const sql = `INSERT INTO "markets"
    ("name", "description", "region", "openTime", "closeTime")
    VALUES ('${market.name}', '${market.description}', '${market.region}', '${market.openTime}', '${market.closeTime}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);
  };
  getMarkets = (callback: Function) => {
    //Call the DB
    console.log("Get all markets");
    const sql = `SELECT * FROM markets`;
    const results = sendIpcSql(sql);
    console.log(results);
    callback(results);
  };
}

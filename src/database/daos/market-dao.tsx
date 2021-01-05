import sendIpcSql from "message-control/renderer";
import { MarketFormProps } from "types/market";
import { deleteById } from "./operations";

export default class MarketDAO {
  static addMarket = (market: MarketFormProps) => {
    //Call the DB
    const sql = `
    INSERT INTO "markets"
    (
    "name"
    , "description"
    , "region"
    , "openTime"
    , "closeTime"
    , "color"
    )
    VALUES (
      '${market.name}'
    , '${market.description}'
    , '${market.region}'
    , '${market.openTime}'
    , '${market.closeTime}'
    , '${market.color}');
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };
  static getMarkets = () => {
    //Call the DB
    console.log("Get all markets");
    const sql = `
    SELECT * FROM markets
    `;

    const results = sendIpcSql(sql);
    return results;
  };
  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("markets", id);
    return results;
  };
}

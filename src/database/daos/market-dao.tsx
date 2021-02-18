import sendIpcSql from "message-control/renderer";
import moment from "moment";
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
    , "creationDate"
    , "lastUpdateDate"
    )
    VALUES (
      '${market.name}'
    , '${market.description}'
    , '${market.region}'
    , '${market.openTime}'
    , '${market.closeTime}'
    , '${market.color}'
    , '${moment(new Date())}'
    , '${moment(new Date())}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };
  static exportAll = () => {
    //Call the DB
    console.log("Export all markets");
    const sql = `
    SELECT name, color, region, description, openTime, closeTime
    FROM "markets";
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getByName = (name: string) => {
    const sql = `SELECT * FROM "markets" WHERE "name" = '${name}'`;
    const result = sendIpcSql(sql, "get");
    return result;
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

import sendSql from "../message-control/renderer";
import { MarketItemProps } from "../types/market";

export function addMarket(market: MarketItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "markets"
  ("name", "description", "region", "openTime", "closeTime")
  VALUES ('${market.name}', '${market.description}', '${market.region}', '${market.openTime}', '${market.closeTime}');`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);

  return sql;
}

export const getMarkets = async (callback: Function) => {
  //Call the DB
  console.log("Get all markets");
  const sql = `SELECT * FROM markets`;
  const results = sendSql(sql);
  console.log(results);
  callback(results);
};

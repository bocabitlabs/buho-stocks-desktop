import { getMarketsMessageReply, addMarketsMessageReply } from "../message-control/messages";
import { MarketItemProps } from "../types/market";
import sendSqlWithCallback from "./send-sql";



export function addMarket(market: MarketItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "markets"
  ("name", "description", "region", "openTime", "closeTime")
  VALUES ('${market.name}', '${market.description}', '${market.region}', '${market.openTime}', '${market.closeTime}');`;

  sendSqlWithCallback(sql, addMarketsMessageReply, callback, (error:string)=> console.log(error))

  return sql;
}

export const getMarkets = async (callback: Function) => {
  //Call the DB
  console.log("Get all markets")
  const sql = `SELECT * FROM markets`;
  sendSqlWithCallback(sql, getMarketsMessageReply, callback, (error:string)=> console.log(error));
};
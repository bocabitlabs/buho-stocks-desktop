import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { MarketFormProps } from "types/market";
import { deleteById, getById } from "../operations/operations";

export default class MarketDAO {
  static create = (market: MarketFormProps) => {
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
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };
  static exportAll = () => {
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

  static getById = (id: string) => {
    //Call the DB
    const results = getById("markets", id);
    return results;
  };

  static getAll = () => {
    //Call the DB
    const sql = `
    SELECT * FROM markets
    ORDER BY name ASC
    `;
    const results = sendIpcSql(sql);
    return results;
  };
  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("markets", id);
    return results;
  };

  static update = (id: string, market: MarketFormProps) => {
    const sql = `
    UPDATE markets
    SET
    name = '${market.name}'
    , description = '${market.description}'
    , region = '${market.region}'
    , color = '${market.color}'
    , openTime = '${market.openTime}'
    , closeTime = '${market.closeTime}'
    , lastUpdateDate = '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    WHERE markets.id = '${id}';
    `;
    const results = sendIpcSql(sql, "update");
    return results;
  };
}

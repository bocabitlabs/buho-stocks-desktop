import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { SectorFormFields } from "types/sector";
import { deleteById, getById } from "./operations";

export default class SectorDAO {
  static exportAll = () => {
    //Call the DB
    console.log("Export all sectors");
    const sql = `
    SELECT name, color
    FROM "sectors";
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getSectors = () => {
    //Call the DB
    console.log("Get all sectors");
    const sql = `
    SELECT * FROM sectors
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getByName = (name: string) => {
    const sql = `SELECT * FROM "sectors" WHERE "name" = '${name}'`;
    const result = sendIpcSql(sql, "get");
    return result;
  };

  static getById = (id: string) => {
    const results = getById("sectors", id);
    return results;
  };

  static addSector = (sector: SectorFormFields) => {
    //Call the DB
    const sql = `
    INSERT INTO "sectors"
    (
        "name"
      , "color"
      , "creationDate"
      , "lastUpdateDate"
      )
    VALUES (
        '${sector.name}'
      , '${sector.color}'
      , '${moment(new Date())}'
      , '${moment(new Date())}'
      );
    `;
    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("sectors", id);
    return results;
  };
}

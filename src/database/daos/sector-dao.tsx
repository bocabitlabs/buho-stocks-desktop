import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { SectorFormFields } from "types/sector";
import { deleteById, getById } from "./operations";

export default class SectorDAO {
  static exportAll = () => {
    //Call the DB
    console.debug("Export all sectors");
    const sql = `
    SELECT name, color
    FROM "sectors";
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getSectors = () => {
    //Call the DB
    console.debug("Get all sectors");
    const sql = `
    SELECT * FROM sectors
    ORDER BY name ASC
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
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
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

  static update = (id: string, element: SectorFormFields) => {
    const sql = `
    UPDATE sectors
    SET
    name = '${element.name}'
    , color = '${element.color}'
    , lastUpdateDate = '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    WHERE sectors.id = '${id}';
    `;
    const results = sendIpcSql(sql, "update");
    return results;
  };
}

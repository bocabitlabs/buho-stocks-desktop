import sendIpcSql from "message-control/renderer";
import moment from "moment";
import { SectorFormFields } from "types/sector";
import { deleteById, getById } from "../operations";

export default class SectorDAO {
  static exportAll = () => {
    //Call the DB
    console.debug("Export all sectors");
    const sql = `
    SELECT name, color, isSuperSector, superSectorId
    FROM "sectors";
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getAll = () => {
    //Call the DB
    const sql = `
    SELECT sectors.*
      , superSectors.name as superSectorName
    FROM sectors
    LEFT JOIN "sectors" as superSectors
      ON sectors.superSectorId = superSectors.id
    ORDER BY name ASC
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  static getByName = (name: string) => {
    const sql = `
    SELECT sectors.*
      , superSectors.name as superSectorName
    FROM sectors
    WHERE "name" = '${name}'
    LEFT JOIN "sectors" as superSectors
      ON sectors.superSectorId = superSectors.id
    `;
    const result = sendIpcSql(sql, "get");
    return result;
  };

  static getById = (id: string) => {
    const results = getById("sectors", id);
    return results;
  };

  static create = (sector: SectorFormFields) => {
    //Call the DB
    console.debug("Adding new sector")
    const sql = `
    INSERT INTO "sectors"
    (
        "name"
      , "color"
      , "isSuperSector"
      , "superSectorId"
      , "creationDate"
      , "lastUpdateDate"
      )
    VALUES (
        '${sector.name}'
      , '${sector.color}'
      , '${sector.isSuperSector ? 1 : 0}'
      , ${sector.superSectorId === undefined? null: `'${sector.superSectorId}'`}
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
      , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
      );
    `;
    console.debug(sql)
    const results = sendIpcSql(sql, "insert");
    return results;
  };

  static deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("sectors", id);
    return results;
  };

  static update = (id: string, element: SectorFormFields) => {
    console.debug(
      `Saving sector: ${element.isSuperSector} ${
        element.isSuperSector ? 1 : 0
      } ${element.superSectorId}`
    );
    let superSectorUpdate = `, superSectorId = '${element.superSectorId}'`
    if(element.superSectorId===null){
      superSectorUpdate=""
    }
    const sql = `
    UPDATE sectors
    SET
    name = '${element.name}'
    , color = '${element.color}'
    , isSuperSector = '${element.isSuperSector ? 1 : 0}'
    SUPERSECTOR_UPDATE
    , lastUpdateDate = '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    WHERE sectors.id = '${id}';
    `;

    const results = sendIpcSql(sql.replace("SUPERSECTOR_UPDATE", superSectorUpdate), "update");
    return results;
  };
}

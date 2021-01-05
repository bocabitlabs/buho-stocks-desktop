import sendIpcSql from "message-control/renderer";
import { SectorFormFields } from "types/sector";
import { deleteById, getById } from "./operations";

export default class SectorDAO {
  static getSectors = () => {
    //Call the DB
    console.log("Get all sectors");
    const sql = `
    SELECT * FROM sectors
    `;
    const results = sendIpcSql(sql);
    return results;
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
      )
    VALUES (
        '${sector.name}'
      , '${sector.color}'
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

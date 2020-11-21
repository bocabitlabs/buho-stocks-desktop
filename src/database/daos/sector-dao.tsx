import sendIpcSql from "../../message-control/renderer";
import { SectorItemProps } from "../../types/sector";
import { deleteById, getById } from "./operations";

export default class SectorDAO {
  getSectors = () => {
    //Call the DB
    console.log("Get all sectors");
    const sql = `
    SELECT * FROM sectors
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  getById = (id: string) => {
    const results = getById("sectors", id);
    return results;
  };

  addSector = (sector: SectorItemProps) => {
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

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("sectors", id);
    return results;
  };
}

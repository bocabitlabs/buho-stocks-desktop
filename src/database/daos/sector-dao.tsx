import sendIpcSql from "../../message-control/renderer";
import { SectorItemProps } from "../../types/sector";

export default class SectorDAO {
  getSectors = () => {
    //Call the DB
    console.log("Get all sectors");
    const sql = `SELECT * FROM sectors`;
    const results = sendIpcSql(sql);
    console.log(results);

    return results;
  };

  getSectorById = (sectorId: string) => {
    //Call the DB
    console.log("Get sector by ID");
    const sql = `SELECT * FROM sector WHERE "id" = '${sectorId}'`;
    const results = sendIpcSql(sql, "get");
    console.log(results);
    return results;
  };

  addSector = (sector: SectorItemProps) => {
    //Call the DB
    const sql = `INSERT INTO "sectors"
    ("name", "color")
    VALUES ('${sector.name}', '${sector.color}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    return results;
  };

  deleteSectorById = (sectorId: string) => {
    //Call the DB
    console.log("Delete sector by ID");
    const sql = `DELETE FROM sectors WHERE "id" = '${sectorId}'`;
    const results = sendIpcSql(sql, "delete");
    console.log(results);
    return results;
  };
}

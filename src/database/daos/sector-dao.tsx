import sendIpcSql from "../../message-control/renderer";
import { SectorItemProps } from "../../types/sector";

export default class SectorDAO {
  getSectors = (callback: Function) => {
    //Call the DB
    console.log("Get all sectors");
    const sql = `SELECT * FROM sectors`;
    const results = sendIpcSql(sql);
    console.log(results);

    callback(results);
  };

  getSectorById = (sectorId: string, callback: Function) => {
    //Call the DB
    console.log("Get sector by ID");
    const sql = `SELECT * FROM sector WHERE "id" = '${sectorId}'`;
    const results = sendIpcSql(sql, "get");
    console.log(results);
    callback(results);
  };

  addSector = (company: SectorItemProps, callback: Function) => {
    //Call the DB
    const sql = `INSERT INTO "sectors"
    ("name")
    VALUES ('${company.name}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);

    callback(results);
  };
}

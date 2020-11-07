import sendSql from "../message-control/renderer";
import { SectorItemProps } from "../types/sector";

export function addSector(company: SectorItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "sectors"
  ("name")
  VALUES ('${company.name}');`;

  const results = sendSql(sql, "insert");
  console.log(results);

  callback(results);

  return sql;
}

export const getSectors = async (callback: Function) => {
  //Call the DB
  console.log("Get all sectors");
  const sql = `SELECT * FROM sectors`;
  const results = sendSql(sql);
  console.log(results);

  callback(results);
};

export const getSectorById = async (sectorId: string, callback: Function) => {
  //Call the DB
  console.log("Get sector by ID");
  const sql = `SELECT * FROM sector WHERE "id" = '${sectorId}'`;
  const results = sendSql(sql);
  console.log(results);

  callback(results);
};

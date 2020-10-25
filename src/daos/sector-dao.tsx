import {
  getSectorsMessageReply,
  addSectorsMessageReply,
  getSectorDetailsMessageReply
} from "../message-control/messages";
import { SectorItemProps } from "../types/sector";
import sendSqlWithCallback from "./send-sql";

export function addSector(company: SectorItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "sectors"
  ("name")
  VALUES ('${company.name}');`;

  sendSqlWithCallback(sql, addSectorsMessageReply, callback, (error: string) =>
    console.log(error)
  );

  return sql;
}

export const getSectors = async (callback: Function) => {
  //Call the DB
  console.log("Get all sectors");
  const sql = `SELECT * FROM sectors`;
  sendSqlWithCallback(sql, getSectorsMessageReply, callback, (error: string) =>
    console.log(error)
  );
};

export const getSectorById = async (
  sectorId: string,
  callback: Function
) => {
  //Call the DB
  console.log("Get sector by ID");
  const sql = `SELECT * FROM sector WHERE "id" = '${sectorId}'`;
  sendSqlWithCallback(
    sql,
    getSectorDetailsMessageReply,
    callback,
    (error: string) => console.log(error)
  );
};

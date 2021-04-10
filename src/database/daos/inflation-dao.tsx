import moment from "moment";
import { Inflation, InflationFormFields } from "types/inflation";
import sendIpcSql from "../../message-control/renderer";
import {
  deleteById as deleteByIdOperation,
  getById as getByIdOperation
} from "./operations/operations";

const addInflation = (inflation: InflationFormFields) => {
  //Call the DB
  const sql = `
  INSERT INTO "inflations"
  (
      "year"
    , "percentage"
    , "creationDate"
    , "lastUpdateDate"
    )
  VALUES (
      '${inflation.year}'
    , '${inflation.percentage}'
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    , '${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'
    );
  `;
  const results = sendIpcSql(sql, "insert");
  return results;
};


const deleteById = (id: string) => {
  //Call the DB
  const results = deleteByIdOperation("inflations", id);
  return results;
};

const exportAll = () => {
  //Call the DB
  console.debug("Export all inflations");
  const sql = `
  SELECT year, percentage
  FROM "inflations";
  `;
  const results = sendIpcSql(sql);
  return results;
};

const getByYear = (year: number) => {
  const sql = `SELECT * FROM "inflations" WHERE "year" = '${year}'`;
  const result = sendIpcSql(sql, "get");
  return result;
};

const getAll = (): Inflation[] => {
  //Call the DB
  const sql = `
  SELECT * FROM inflations
  `;
  const results = sendIpcSql(sql);
  return results;
};

const getById = (id: string): Inflation => {
  const results = getByIdOperation("inflations", id);
  return results;
};

const getInflationsForYear = (year: number): Inflation[] => {
  const sql = `
  SELECT *
  FROM inflations
  WHERE year<${year}
  ORDER BY year ASC
  `;

  const results = sendIpcSql(sql);
  return results;
};

const exportedModule = {
  addInflation,
  exportAll,
  deleteById,
  getAll,
  getByYear,
  getById,
  getInflationsForYear
};

export default exportedModule;

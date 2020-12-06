import sendIpcSql from "../../message-control/renderer";
import { InflationFields, InflationItemProps } from "../../types/inflation";
import {
  deleteById as deleteByIdOperation,
  getById as getByIdOperation
} from "./operations";

const addInflation = (inflation: InflationItemProps) => {
  //Call the DB
  const sql = `
  INSERT INTO "inflations"
  (
      "year"
    , "percentage"
    )
  VALUES (
      '${inflation.year}'
    , '${inflation.percentage}'
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

const getAll = (): InflationFields[] => {
  //Call the DB
  const sql = `
  SELECT * FROM inflations
  `;
  const results = sendIpcSql(sql);
  return results;
};

const getById = (id: string): InflationFields => {
  const results = getByIdOperation("inflations", id);
  return results;
};

const getInflationsForYear = (year: number): InflationFields[] => {
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
  deleteById,
  getAll,
  getById,
  getInflationsForYear
};

export default exportedModule;

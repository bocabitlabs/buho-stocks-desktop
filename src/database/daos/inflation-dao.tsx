import sendIpcSql from "../../message-control/renderer";
import { InflationItemProps } from "../../types/inflation";
import { deleteById, getById } from "./operations";

export default class InflationDAO {
  getAll = () => {
    //Call the DB
    const sql = `
    SELECT * FROM inflations
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  getById = (id: string) => {
    const results = getById("inflations", id);
    return results;
  };

  addInflation = (inflation: InflationItemProps) => {
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

  getInflationsForYear = (year: number) => {
    const sql = `
    SELECT *
    FROM inflations
    WHERE year<${year}
    ORDER BY year ASC
    `;

    const results = sendIpcSql(sql);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("inflations", id);
    return results;
  };
}

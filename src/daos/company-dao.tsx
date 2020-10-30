import {
  getCompaniesMessageReply,
  addCompaniesMessageReply
} from "../message-control/messages";
import { CompanyItemProps } from "../types/company";
import sendSqlWithCallback from "./send-sql";

export function addCompany(company: CompanyItemProps, callback: Function) {
  //Call the DB
  const sql = `INSERT INTO "companies"
  ("name", "ticker", "description", "sectorId", "marketId", "currencyId", "portfolioId", "url")
  VALUES ('${company.name}', '${company.ticker}', '${company.description}', '${company.sector}', '${company.market}', '${company.currency}', '${company.portfolio}', '${company.url}');`;

  sendSqlWithCallback(
    sql,
    addCompaniesMessageReply,
    callback,
    (error: string) => console.log(error)
  );

  return sql;
}

export const getCompanies = async (callback: Function) => {
  //Call the DB
  console.log("Get all companies");
  const sql = `SELECT companies.id as id, companies.name as name, sectors.name as sector, currencies.name as currency, ticker
  FROM  "companies"
  LEFT JOIN "sectors"
  ON companies.sectorId = sectors.id
  LEFT JOIN "currencies"
  ON companies.currencyId = currencies.id;`;
  sendSqlWithCallback(
    sql,
    getCompaniesMessageReply,
    callback,
    (error: string) => console.log(error)
  );
};

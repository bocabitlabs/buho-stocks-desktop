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

export const getCompanies = async (portfolioId: string, callback: Function) => {
  //Call the DB
  console.log("Get all companies");
  const sql = `SELECT companies.*, sectors.name as sector, sectors.id as sectorId, currencies.name as currency, currencies.id as currencyId,
  sum(shares.sharesNumber) as sharesNumber,
  sum(shares.commission) as commission,
  sum(shares.priceShare * shares.sharesNumber) as total,
  portfolios.name as portfolioName,
  currencies.name as currencyName,
  currencies.symbol as currencySymbol
  FROM "companies"
  LEFT JOIN "portfolios"
    ON portfolios.id = companies.portfolioId
  LEFT JOIN "currencies"
    ON currencies.id = companies.currencyId
  LEFT JOIN "sectors"
    ON sectors.id = companies.sectorId
  LEFT JOIN "shares"
    ON companies.id = shares.companyId
  WHERE companies.portfolioId = '${portfolioId}';`;
  sendSqlWithCallback(
    sql,
    getCompaniesMessageReply,
    callback,
    (error: string) => console.log(error)
  );
};

export const getCompany = async (companyId: string, callback: Function) => {
  //Call the DB
  console.log("Get company");
  const sql = `SELECT companies.*,
   portfolios.name as portfolioName,
   currencies.name as currencyName,
   currencies.symbol as currencySymbol
  FROM "companies"
  LEFT JOIN "portfolios"
  ON portfolios.id = companies.portfolioId
  LEFT JOIN "currencies"
    ON currencies.id = companies.currencyId
  WHERE companies.id = '${companyId}';`;
  sendSqlWithCallback(
    sql,
    getCompaniesMessageReply,
    callback,
    (error: string) => console.log(error)
  );
};

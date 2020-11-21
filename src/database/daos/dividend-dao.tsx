import sendIpcSql from "../../message-control/renderer";
import { DividendItemProps } from "../../types/dividend";
import { deleteById } from "./operations";

export default class DividendDAO {
  addDividend = (dividend: DividendItemProps) => {
    //Call the DB
    const sql = `
    INSERT INTO "dividends"
    (
       "sharesNumber"
      ,"priceShare"
      ,"commission"
      ,"exchangeRate"
      ,"notes"
      ,"operationDate"
      ,"companyId"
      ,"color"
    )
    VALUES
    (
       '${dividend.sharesNumber}'
     , '${dividend.priceShare}'
     , '${dividend.commission}'
     , '${dividend.exchangeRate}'
     , '${dividend.notes}'
     , '${dividend.operationDate}'
     , '${dividend.companyId}'
     , '${dividend.color}'
    );
    `;

    const results = sendIpcSql(sql, "insert");
    return results;
  };

  getDividends = (companyId: string) => {
    //Call the DB
    console.log("Get all dividends");
    const sql = `
    SELECT
      dividends.*
      , currencies.symbol as currencySymbol
      , currencies.name as currencyName
    FROM  "dividends"
    LEFT JOIN "companies"
      ON companies.id = dividends.companyId
    LEFT JOIN "currencies"
      ON currencies.id = companies.currencyId
    WHERE dividends.companyId = '${companyId}';
    `;

    const results = sendIpcSql(sql);
    return results;
  };

  getDividendsPerYearByCompanyId = (companyId: string) => {
    const sql = `
    SELECT
      strftime("%Y", operationDate) as 'year',
      companyId,
      sum(sharesNumber) as usedShares,
      sum(commission) as dividendsCommission,
      count(priceShare) as dividendCount,
      sum(sharesNumber * priceShare) as totalDividends,
      sum(sharesNumber * priceShare * exchangeRate) as totalDividendsBase
    FROM  "dividends"
    WHERE dividends.companyId = '${companyId}'
    GROUP BY strftime("%Y", operationDate)
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("dividends", id);
    return results;
  };
}

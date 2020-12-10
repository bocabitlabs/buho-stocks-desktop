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
      strftime('%Y', dividends.operationDate) as year
      , count(dividends.companyId) as dividendsOperationsCount
      , sum(dividends.commission) as dividendsCommission
      , sum(dividends.sharesNumber) as sharesNumber
      , sum(dividends.priceShare * dividends.sharesNumber - dividends.commission) as dividendsNet
      , sum((dividends.priceShare * dividends.sharesNumber - dividends.commission) * dividends.exchangeRate) as dividendsNetBaseCurrency
      , sum(dividends.priceShare * dividends.sharesNumber) as dividendsGross
      , sum(dividends.priceShare * dividends.sharesNumber * dividends.exchangeRate) as dividendsGrossBaseCurrency
	  FROM "dividends"
    WHERE dividends.companyId = '${companyId}'
    GROUP BY strftime('%Y', operationDate)
    ORDER BY strftime('%Y', operationDate)
    ;
    `;
    const results = sendIpcSql(sql);
    return results;
  };

  getDividendsByCompanyId = (companyId: string) => {
    const sql = `
      SELECT
      sum(dividends.priceShare * dividends.sharesNumber - dividends.commission) as dividendsNet
      , sum((dividends.priceShare * dividends.sharesNumber - dividends.commission) * dividends.exchangeRate) as dividendsNetBaseCurrency
      , sum(dividends.priceShare * dividends.sharesNumber) as dividendsGross
      , sum(dividends.priceShare * dividends.sharesNumber * dividends.exchangeRate) as dividendsGrossBaseCurrency
	  FROM "dividends"
    WHERE dividends.companyId = '${companyId}';
      `;
    const results = sendIpcSql(sql, 'get');
    return results;
  };

  deleteById = (id: string) => {
    //Call the DB
    const results = deleteById("dividends", id);
    return results;
  };
}

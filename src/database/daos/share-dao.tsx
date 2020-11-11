import sendIpcSql from "../../message-control/renderer";
import { ShareItemProps } from "../../types/share";

export default class ShareDAO {
  addShare = (share: ShareItemProps) => {
    //Call the DB
    const sql = `INSERT INTO "shares"
    ("sharesNumber",
     "priceShare",
       "commission",
        "type",
         "exchangeRate",
          "notes",
           "operationDate",
            "companyId")
    VALUES ('${share.sharesNumber}',
     '${share.priceShare}',
      '${share.commission}',
       '${share.type}',
        '${share.exchangeRate}',
         '${share.notes}',
           '${share.operationDate}',
            '${share.companyId}');`;

    const results = sendIpcSql(sql, "insert");
    console.log(results);
    return results;
  };

  getShares = (companyId: string) => {
    //Call the DB
    console.log("Get all shares");
    const sql = `SELECT shares.*, currencies.symbol as currencySymbol, currencies.name as currencyName
    FROM  "shares"
    LEFT JOIN "companies"
    ON companies.id = shares.companyId
    LEFT JOIN "currencies"
    ON currencies.id = companies.currencyId
    WHERE shares.companyId = '${companyId}';`;
    const results = sendIpcSql(sql);
    console.log(results);

    return results;
  };

  deleteShareById = (shareId: string) => {
    //Call the DB
    console.log("Delete share by ID");
    const sql = `DELETE FROM shares WHERE "id" = '${shareId}'`;
    const results = sendIpcSql(sql, "delete");
    console.log(results);
    return results;
  };
}

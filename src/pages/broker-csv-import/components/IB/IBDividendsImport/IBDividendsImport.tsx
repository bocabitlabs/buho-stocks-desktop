import { Typography } from "antd";
import React, { useState } from "react";
import { CSVReader } from "react-papaparse";
import { IPortfolio } from "types/portfolio";
import IBDividendsImportForm from "./IBDividendsImportForm/IBDividendsImportForm";

interface Props {
  portfolio: IPortfolio;
}

export const IBDividendsImport = ({ portfolio }: Props) => {
  const rowHeaders = ["Dividendos", "Dividends"];
  const rowTaxHeaders = ["Retención de impuestos", "Withholding Tax"];
  const rowSubHeaders = ["Data"];
  const rowNotAllowedFilters = ["Total", ""];
  const [data, setData] = useState([]);
  const [commissionsData, setCommissionsData] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  const handleOnFileLoad = (data: any) => {
    setUploaded(true);
    const filteredData = data.filter((element: any) => {
      return (
        rowHeaders.includes(element.data[0]) &&
        rowSubHeaders.includes(element.data[1]) &&
        !rowNotAllowedFilters.includes(element.data[2]) &&
        !rowNotAllowedFilters.includes(element.data[3])
      );
    });

    const commissionsArray = data.filter((element: any) => {
      return rowTaxHeaders.includes(element.data[0]);
    });

    filteredData.forEach((element: any) => {
      const commissions = getCommissionsForElement(
        element.data[4],
        element.data[3],
        commissionsArray
      );
      element.commissions = commissions;
    });
    setData(filteredData);
    setCommissionsData(commissionsData);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.debug(err);
  };

  /**
   * Obtain the commission element from the csv if present
   * @param elementDescription
   * @param transactionDate
   */
  const getCommissionsForElement = (
    elementDescription: string,
    transactionDate: string,
    commissionsArray: any
  ) => {
    const nameWithISINMatch = elementDescription.match(/(\w)+\s?\(\w+\)/g);
    console.debug("Name with ISIN: ", nameWithISINMatch);
    if (nameWithISINMatch && nameWithISINMatch.length > 0) {
      const nameWithISIN = nameWithISINMatch[0];

      const commissionElement = commissionsArray.find((element: any) => {
        const taxesNameWithIsinMatch = element.data[4].match(
          /(\w)+\s?\(\w+\)/g
        );
        return (
          taxesNameWithIsinMatch &&
          taxesNameWithIsinMatch.length > 0 &&
          taxesNameWithIsinMatch[0] === nameWithISIN &&
          transactionDate === element.data[3]
        );
      });
      if (commissionElement) {
        return commissionElement.data;
      }
      return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <CSVReader onDrop={handleOnFileLoad} onError={handleOnError} noDrag>
          <span>Click to upload a csv file with dividends data from Interactive Brokers.</span>
        </CSVReader>
      </div>
      {data.length > 0 && commissionsData && (
        <div>
          <Typography.Title level={4}>
            Importing dividends from Interactive Brokers:
          </Typography.Title>
          <ol>
            {data.map((element: any) => {
              return (
                <IBDividendsImportForm
                  inputData={element.data}
                  portfolio={portfolio}
                  taxData={element.commissions}
                />
              );
            })}
          </ol>
        </div>
      )}
      {uploaded === true && data.length === 0 && (
        <div>
          <Typography.Title level={4}>No dividends found</Typography.Title>
        </div>
      )}
    </div>
  );
};

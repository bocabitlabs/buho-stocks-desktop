import { Typography } from "antd";
import React, { useState } from "react";
import { CSVReader } from "react-papaparse";
import { IPortfolio } from "types/portfolio";
import INGDividendsImportForm from "../INGDividendsImportForm/INGDividendsImportForm";

interface Props {
  portfolio: IPortfolio;
}

export const INGDividendsImport = ({ portfolio }: Props) => {
  const [data, setData] = useState([]);
  const validTransactionTypes = ["DIVIDENDO"];
  const handleOnFileLoad = (data: any) => {
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

    const filteredData = data.filter((element: any) => {
      console.log(
        "Validating ",
        element.data[0],
        dateRegex.test(element.data[0])
      );
      return (
        dateRegex.test(element.data[0]) &&
        validTransactionTypes.includes(element.data[1])
      );
    });
    console.log(filteredData, filteredData.length);

    setData(filteredData);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <CSVReader onDrop={handleOnFileLoad} onError={handleOnError} noDrag>
          <span>Click to upload.</span>
        </CSVReader>
      </div>
      {data.length > 0 && (
        <div>
          <Typography.Title level={4}>
            Importing dividends from ING:
          </Typography.Title>
          <ol>
            {data.map((element: any, key) => {
              return (
                <INGDividendsImportForm
                  key={key}
                  inputData={element.data}
                  portfolio={portfolio}
                />
              );
            })}
          </ol>
        </div>
      )}
      {data.length === 0 && (
        <div>
          <Typography.Title level={4}>No dividends found</Typography.Title>
        </div>
      )}
    </div>
  );
};

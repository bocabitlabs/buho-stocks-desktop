import { Typography } from "antd";
import React, { useState } from "react";
import { CSVReader } from "react-papaparse";
import { IPortfolio } from "types/portfolio";
import IBTradesImportForm from "../IBTradesImportForm/IBTradesImportForm";

interface Props {
  portfolio: IPortfolio;
}

export const IBTradesImport = ({ portfolio }: Props) => {
  const rowHeaders = ["Operaciones", "Trades"];
  const rowSubHeaders = ["Data"];
  const rowFilters = ["Acciones", "Stocks"];
  const [data, setData] = useState([]);

  const handleOnFileLoad = (data: any) => {
    const filteredData = data.filter((element: any) => {
      return (
        (rowHeaders.includes(element.data[0])) &&
        (rowSubHeaders.includes(element.data[1])) &&
        (rowFilters.includes(element.data[3]))
      );
    });

    setData(filteredData);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.error(err);
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
            Importing trades from IB:
          </Typography.Title>

          <ol>
            {data.map((element: any) => {
              return (
                <IBTradesImportForm
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
          <Typography.Title level={4}>No trades found</Typography.Title>
        </div>
      )}
    </div>
  );
};

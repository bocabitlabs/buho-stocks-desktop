import { Typography } from "antd";
import IBTradesImportForm from "pages/CsvImport/components/ING/INGTradesImportForm/INGTradesImportForm";
import React, { useState } from "react";
import { CSVReader } from "react-papaparse";
import { IPortfolio } from "types/portfolio";

interface Props {
  portfolio: IPortfolio;
}

export const IBTradesImport = ({ portfolio }: Props) => {
  const rowHeaders = ["Operaciones", "Trades"];
  const rowSubHeaders = ["Data"];
  const rowFilters = ["Acciones", "Stocks"];
  const [data, setData] = useState([]);

  const handleOnFileLoad = (data: any) => {
    setData(data);
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
            Importing trades from IB:
          </Typography.Title>

          <ol>
            {data.map((element: any) => {
              if (rowHeaders.includes(element.data[0])) {
                if (rowSubHeaders.includes(element.data[1])) {
                  if (rowFilters.includes(element.data[3])) {
                    console.log(element.data);
                    return (
                      <IBTradesImportForm
                        inputData={element.data}
                        portfolio={portfolio}
                      />
                    );
                  }
                }
              }
              return null;
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

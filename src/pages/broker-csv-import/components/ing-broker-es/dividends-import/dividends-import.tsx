import { Typography } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CSVReader } from "react-papaparse";
import { IPortfolio } from "types/portfolio";
import INGDividendsImportForm from "./dividends-import-form/dividends-import-form";

interface Props {
  portfolio: IPortfolio;
}

export const INGDividendsImport = ({ portfolio }: Props) => {
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const [uploaded, setUploaded] = useState(false);

  const validTransactionTypes = ["DIVIDENDO"];

  const handleOnFileLoad = (data: any) => {
    setUploaded(true);
    const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

    const filteredData = data.filter((element: any) => {
      return (
        dateRegex.test(element.data[0]) &&
        validTransactionTypes.includes(element.data[1])
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
          <span>{t("Click to upload a CSV file with dividends data from ING (es).")}</span>
        </CSVReader>
      </div>
      {data.length > 0 && (
        <div>
          <Typography.Title level={4}>
            {t("Importing dividends from ING")}:
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
      {uploaded && data.length === 0 && (
        <div>
          <Typography.Title level={4}>{t("No dividends found")}</Typography.Title>
        </div>
      )}
    </div>
  );
};

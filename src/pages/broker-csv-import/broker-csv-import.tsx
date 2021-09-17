import { Layout } from "antd";
import { ExchangeRatesContext } from "contexts/exchange-rates";
import { useExchangeRatesContext } from "hooks/exchange-rates/use-exchange-rates-context";
import React, { ReactElement } from "react";
import CsvImportContent from "./components/CsvImportContent/CsvImportContent";
import CsvImportHeader from "./components/CsvImportHeader/CsvImportHeader";

export default function BrokerCsvImport(): ReactElement {
  const exchangeRatesContext = useExchangeRatesContext();

  return (
    <ExchangeRatesContext.Provider value={exchangeRatesContext}>
      <CsvImportHeader />
      <Layout style={{ padding: "0 20px 0px 20px", backgroundColor: "#fff" }}>
        <CsvImportContent />
      </Layout>
    </ExchangeRatesContext.Provider>
  );
}

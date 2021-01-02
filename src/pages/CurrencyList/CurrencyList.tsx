import React from "react";

import { Layout } from "antd";

import { useCurrenciesContext } from "../../hooks/currencies";
import { CurrenciesContext } from "../../contexts/currencies";
import CurrencyListHeader from "./components/CurrencyListHeader/CurrencyListHeader";
import CurrencyListTable from "./components/CurrencyListTable/CurrencyListTable";

const CurrencyList = () => {
  const currenciesContext = useCurrenciesContext();

  return (
    <>
      <CurrencyListHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <CurrenciesContext.Provider value={currenciesContext}>
          <CurrencyListTable />
        </CurrenciesContext.Provider>
      </Layout>
    </>
  );
};

export default CurrencyList;

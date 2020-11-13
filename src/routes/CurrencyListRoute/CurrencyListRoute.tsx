import React from "react";

import { Layout } from "antd";

import CurrencyListTable from "../../components/CurrencyListTable/CurrencyListTable";
import { useCurrenciesContext } from "../../hooks/currencies";
import { CurrenciesContext } from "../../contexts/currencies";

const CurrencyListRoute = () => {
  const currenciesContext = useCurrenciesContext();

  return (
    <>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <CurrenciesContext.Provider value={currenciesContext}>
          <CurrencyListTable />
        </CurrenciesContext.Provider>
      </Layout>
    </>
  );
};

export default CurrencyListRoute;

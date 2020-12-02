import React from "react";

import { Layout } from "antd";

import { useCurrenciesContext } from "../../hooks/currencies";
import { CurrenciesContext } from "../../contexts/currencies";
import AddCurrencyRouteHeader from "./CurrencyAddRouteHeader";
import CurrencyAddForm from "../../components/CurrencyAddForm/CurrencyAddForm";

const CurrencyAddRoute = () => {
  const currenciesContext = useCurrenciesContext();

  return (
    <>
      <AddCurrencyRouteHeader />
      <CurrenciesContext.Provider value={currenciesContext}>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <CurrencyAddForm />
        </Layout>
      </CurrenciesContext.Provider>
    </>
  );
};

export default CurrencyAddRoute;

import React from "react";

import { Layout } from "antd";

import { useCurrenciesContext } from "../../hooks/currencies";
import { CurrenciesContext } from "../../contexts/currencies";
import CurrencyAddHeader from "./components/CurrencyAddHeader/CurrencyAddHeader";
import CurrencyAddForm from "./components/CurrencyAddForm/CurrencyAddForm";

const CurrencyAdd = () => {
  const currenciesContext = useCurrenciesContext();

  return (
    <>
      <CurrencyAddHeader />
      <CurrenciesContext.Provider value={currenciesContext}>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <CurrencyAddForm />
        </Layout>
      </CurrenciesContext.Provider>
    </>
  );
};

export default CurrencyAdd;

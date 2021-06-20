import React from "react";

import { Layout } from "antd";

import { useCurrenciesContext } from "hooks/currencies/use-currencies-context";
import { CurrenciesContext } from "contexts/currencies";
import CurrencyAddHeader from "./components/CurrencyAddHeader/CurrencyAddHeader";
import CurrencyAddEditForm from "components/CurrencyAddEditForm/CurrencyAddEditForm";

const CurrencyAdd = () => {
  const currenciesContext = useCurrenciesContext();

  return (
    <>
      <CurrencyAddHeader />
      <CurrenciesContext.Provider value={currenciesContext}>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <CurrencyAddEditForm />
        </Layout>
      </CurrenciesContext.Provider>
    </>
  );
};

export default CurrencyAdd;

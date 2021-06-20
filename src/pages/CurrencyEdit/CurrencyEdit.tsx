import React from "react";

import { Layout } from "antd";

import { useCurrenciesContext } from "hooks/currencies/use-currencies-context";
import { CurrenciesContext } from "contexts/currencies";
import CurrencyAddEditForm from "components/CurrencyAddEditForm/CurrencyAddEditForm";
import { useParams } from "react-router-dom";
import CurrencyEditHeader from "./components/CurrencyEditHeader/CurrencyEditHeader";

export interface IRouteParams {
  currencyId: string;
}

const CurrencyEdit = () => {
  const currenciesContext = useCurrenciesContext();
  const { currencyId } = useParams<IRouteParams>();

  return (
    <CurrenciesContext.Provider value={currenciesContext}>
      <CurrencyEditHeader currencyId={currencyId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <CurrencyAddEditForm currencyId={currencyId} />
      </Layout>
    </CurrenciesContext.Provider>
  );
};

export default CurrencyEdit;

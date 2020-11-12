import React from "react";

import { Layout } from "antd";

import AddCurrencyForm from "../../components/AddCurrencyForm/AddCurrencyForm";
import { useCurrenciesContext } from "../../hooks/currencies";
import { CurrenciesContext } from "../../contexts/currencies";

const AddCurrencyRoute = () => {
  const currenciesContext = useCurrenciesContext();

  return (
    <CurrenciesContext.Provider value={currenciesContext}>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: '#fff' }}>
        <AddCurrencyForm />
      </Layout>
    </CurrenciesContext.Provider>
  );
};

export default AddCurrencyRoute;
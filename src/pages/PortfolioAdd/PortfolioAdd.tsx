import React from "react";

import { Layout } from "antd";

import { CurrenciesContext } from "contexts/currencies";
import { useCurrenciesContext } from "hooks/currencies";
import PortfolioAddHeader from "./components/PortfolioAddHeader/PortfolioAddHeader";
import PortfolioAddForm from "./components/PortfolioAddForm/PortfolioAddForm";

const PortfolioAdd = () => {
  const currenciesContext = useCurrenciesContext();

  return (
    <div>
      <CurrenciesContext.Provider value={currenciesContext}>
        <PortfolioAddHeader />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <PortfolioAddForm />
        </Layout>
      </CurrenciesContext.Provider>
    </div>
  );
};

export default PortfolioAdd;

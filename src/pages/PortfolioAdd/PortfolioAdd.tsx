import React from "react";

import { Layout } from "antd";

import { PortfoliosContext } from "contexts/portfolios";
import { CurrenciesContext } from "contexts/currencies";
import { usePortfoliosContext } from "hooks/portfolios";
import { useCurrenciesContext } from "hooks/currencies";
import PortfolioAddHeader from "./components/PortfolioAddHeader/PortfolioAddHeader";
import PortfolioAddForm from "./components/PortfolioAddForm/PortfolioAddForm";

const PortfolioAdd = () => {
  const portfoliosContext = usePortfoliosContext();
  const currenciesContext = useCurrenciesContext();

  console.log("AddPortfoliosRoute rendered");
  return (
    <PortfoliosContext.Provider value={portfoliosContext}>
      <CurrenciesContext.Provider value={currenciesContext}>
        <PortfolioAddHeader />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <PortfolioAddForm />
        </Layout>
      </CurrenciesContext.Provider>
    </PortfoliosContext.Provider>
  );
};

export default PortfolioAdd;

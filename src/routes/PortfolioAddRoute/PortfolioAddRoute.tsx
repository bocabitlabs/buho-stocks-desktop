import React from "react";

import { Layout } from "antd";

import { PortfoliosContext } from "../../contexts/portfolios";
import { CurrenciesContext } from "../../contexts/currencies";
import { usePortfoliosContext } from "../../hooks/portfolios";
import { useCurrenciesContext } from "../../hooks/currencies";
import PortfolioAddForm from "../../components/PortfolioAddForm/PortfolioAddForm";
import PortfolioAddRouteHeader from "./PortfolioAddRouteHeader";

const PortfolioAddRoute = () => {

  const portfoliosContext = usePortfoliosContext();
  const currenciesContext = useCurrenciesContext();

  console.log("AddPortfoliosRoute rendered");
  return (
    <>
      <PortfolioAddRouteHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfoliosContext.Provider value={portfoliosContext}>
          <CurrenciesContext.Provider value={currenciesContext}>
            <PortfolioAddForm />
          </CurrenciesContext.Provider>
        </PortfoliosContext.Provider>
      </Layout>
    </>
  );
};

export default PortfolioAddRoute;

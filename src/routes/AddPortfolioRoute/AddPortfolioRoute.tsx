import React from "react";

import { Layout } from "antd";

import AddPortfolioForm from "../../components/AddPortfolioForm/AddPortfolioForm";
import { PortfoliosContext } from "../../contexts/portfolios";
import { CurrenciesContext } from "../../contexts/currencies";
import { usePortfoliosContext } from "../../hooks/portfolios";
import { useCurrenciesContext } from "../../hooks/currencies";
import AddPortfolioRouteHeader from "./AddPortfolioRouteHeader";

const AddPortfolioRoute = () => {

  const portfoliosContext = usePortfoliosContext();
  const currenciesContext = useCurrenciesContext();

  console.log("AddPortfoliosRoute rendered");
  return (
    <>
      <AddPortfolioRouteHeader/>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfoliosContext.Provider value={portfoliosContext}>
          <CurrenciesContext.Provider value={currenciesContext}>
            <AddPortfolioForm />
          </CurrenciesContext.Provider>
        </PortfoliosContext.Provider>
      </Layout>
    </>
  );
};

export default AddPortfolioRoute;

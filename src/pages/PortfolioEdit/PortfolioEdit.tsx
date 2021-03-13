import React from "react";

import { Layout } from "antd";
import { useParams } from "react-router-dom";

import { CurrenciesContext } from "contexts/currencies";
import { PortfoliosContext } from "contexts/portfolios";

import { useCurrenciesContext } from "hooks/currencies";
import { usePortfoliosContext } from "hooks/portfolios";

import PortfolioEditHeader from "./components/PortfolioEditHeader/PortfolioEditHeader";
import PortfolioAddEditForm from "components/PortfolioAddEditForm/PortfolioAddEditForm";


export interface IRouteParams {
  portfolioId: string;
}

const PortfolioEdit = () => {
  const { portfolioId } = useParams<IRouteParams>();
  const currenciesContext = useCurrenciesContext();
  const portfoliosContext = usePortfoliosContext();

  return (
    <PortfoliosContext.Provider value={portfoliosContext}>
      <CurrenciesContext.Provider value={currenciesContext}>
        <PortfolioEditHeader portfolioId={portfolioId} />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <PortfolioAddEditForm portfolioId={portfolioId} />
        </Layout>
      </CurrenciesContext.Provider>
    </PortfoliosContext.Provider>
  );
};

export default PortfolioEdit;

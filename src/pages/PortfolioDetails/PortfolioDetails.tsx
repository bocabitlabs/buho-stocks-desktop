import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";
import { PortfoliosContext } from "../../contexts/portfolios";
import { usePortfoliosContext } from "../../hooks/portfolios";
import PortfolioDetailsHeader from "./components/PortfolioDetailsHeader/PortfolioDetailsHeader";
import CompanyCardList from "./components/CompanyCardList/CompanyCardList";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetails = () => {
  const { id } = useParams<IPortfolioRouteParams>();

  const companiesContext = useCompaniesContext(id);
  const portfoliosContext = usePortfoliosContext();

  return (
    <>
      <PortfoliosContext.Provider value={portfoliosContext}>
        <PortfolioDetailsHeader portfolioId={id} />
      </PortfoliosContext.Provider>

      <CompaniesContext.Provider value={companiesContext}>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <CompanyCardList portfolioId={id} />
        </Layout>
      </CompaniesContext.Provider>
    </>
  );
};

export default PortfolioDetails;

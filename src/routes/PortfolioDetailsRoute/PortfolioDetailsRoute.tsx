import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import CompanyListTable from "../../components/CompanyListTable/CompanyListTable";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";
import PortfolioDetailsRouteHeader from "./PortfolioDetailsRouteHeader";
import { PortfoliosContext } from "../../contexts/portfolios";
import { usePortfoliosContext } from "../../hooks/portfolios";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetailsRoute = () => {
  const { id } = useParams<IPortfolioRouteParams>();

  const companiesContext = useCompaniesContext(id);
  const portfoliosContext = usePortfoliosContext();

  return (
    <>
      <PortfoliosContext.Provider value={portfoliosContext}>
        <PortfolioDetailsRouteHeader portfolioId={id} />
      </PortfoliosContext.Provider>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <CompaniesContext.Provider value={companiesContext}>
          <CompanyListTable portfolioId={id} />
        </CompaniesContext.Provider>
      </Layout>
    </>
  );
};

export default PortfolioDetailsRoute;

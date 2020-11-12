import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import CompanyListTable from "../../components/CompanyListTable/CompanyListTable";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";
import { usePortfolioContext } from "../../hooks/portfolio";
import { PortfolioContext } from "../../contexts/portfolio";
import PortfolioDetailsRouteHeader from "./PortfolioDetailsRouteHeader";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetailsRoute = () => {
  const { id } = useParams<IPortfolioRouteParams>();

  const companiesContext = useCompaniesContext(id);
  const portfolioContext = usePortfolioContext(id);

  return (
    <>
      <PortfolioContext.Provider value={portfolioContext}>
        <PortfolioDetailsRouteHeader portfolioId={id} />
      </PortfolioContext.Provider>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <CompaniesContext.Provider value={companiesContext}>
          <CompanyListTable portfolioId={id} />
        </CompaniesContext.Provider>
      </Layout>
    </>
  );
};

export default PortfolioDetailsRoute;

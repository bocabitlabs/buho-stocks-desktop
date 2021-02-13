import React from "react";

import { Layout } from "antd";

import { useHistory, useParams } from "react-router-dom";
import { useCompaniesContext } from "hooks/companies";
import { CompaniesContext } from "contexts/companies";
import PortfolioDetailsHeader from "./components/PortfolioDetailsHeader/PortfolioDetailsHeader";
import CompanyCardList from "./components/CompanyCardList/CompanyCardList";
import PortfolioStats from "./components/PortfolioStats/PortfolioStats";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetails = () => {
  const { id } = useParams<IPortfolioRouteParams>();
  const history = useHistory();
  if (id === undefined) {
    history.push(`/`);
  }

  const companiesContext = useCompaniesContext(id);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <PortfolioDetailsHeader portfolioId={id} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <PortfolioStats />
        <CompanyCardList portfolioId={id} />
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default PortfolioDetails;

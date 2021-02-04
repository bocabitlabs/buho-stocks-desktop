import React from "react";

import { Layout } from "antd";

import { useHistory, useParams } from "react-router-dom";
import { useCompaniesContext } from "hooks/companies";
import { CompaniesContext } from "contexts/companies";
import { PortfoliosContext } from "contexts/portfolios";
import { usePortfoliosContext } from "hooks/portfolios";
import PortfolioDetailsHeader from "./components/PortfolioDetailsHeader/PortfolioDetailsHeader";
import CompanyCardList from "./components/CompanyCardList/CompanyCardList";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetails = () => {
  const { id } = useParams<IPortfolioRouteParams>();
  const history = useHistory();
  console.log("Portfolio details page with id:", id);
  if (id === undefined) {
    console.log("Portfolio is undefined")
    history.push(`/`);
    // return null;
  }

  const companiesContext = useCompaniesContext(id);
  const portfoliosContext = usePortfoliosContext();

  return (
    <PortfoliosContext.Provider value={portfoliosContext}>
      <CompaniesContext.Provider value={companiesContext}>
        <PortfolioDetailsHeader portfolioId={id} />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <CompanyCardList portfolioId={id} />
        </Layout>
      </CompaniesContext.Provider>
    </PortfoliosContext.Provider>
  );
};

export default PortfolioDetails;

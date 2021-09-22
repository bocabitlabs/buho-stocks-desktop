import React from "react";
import { Layout, Space } from "antd";

import { useHistory, useParams } from "react-router-dom";
import { useCompaniesContext } from "hooks/companies/use-companies-context";
import { CompaniesContext } from "contexts/companies";
import PortfolioChartsHeader from "./components/PortfolioChartsHeader/PortfolioChartsHeader";
import ChartsList from "./components/ChartsList/ChartsList";


export interface IPortfolioRouteParams {
  portfolioId: string;
}

const PortfolioCharts = () => {
  const { portfolioId } = useParams<IPortfolioRouteParams>();
  const history = useHistory();

  if (portfolioId === undefined) {
    history.push(`/`);
  }

  const companiesContext = useCompaniesContext(portfolioId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <PortfolioChartsHeader portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <Space direction="vertical">
          <ChartsList/>
        </Space>
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default PortfolioCharts;

import React, { useContext, useEffect } from "react";

import { Button, Layout, PageHeader } from "antd";

import { Link, useHistory, useParams } from "react-router-dom";
import CompanyListTable from "../components/CompanyListTable/CompanyListTable";
import { useCompaniesContext } from "../hooks/companies";
import { CompaniesContext } from "../contexts/companies";
import { PortfoliosContext } from "../contexts/portfolios";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetailsRoute = () => {
  const history = useHistory();
  const { portfolio, fetchPortfolio } = useContext(PortfoliosContext);

  const companiesContext = useCompaniesContext();

  const { id } = useParams<IPortfolioRouteParams>();

  useEffect(() => {
    fetchPortfolio(id);
  }, [id, fetchPortfolio]);

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${id}`,
      name: "portfolio-details",
      breadcrumbName:
      portfolio.length > 0 && portfolio[0] ? portfolio[0].name : ""
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      {portfolio.length > 0 && (
        <>
          <PageHeader
            title={`${portfolio[0].name}`}
            breadcrumb={{
              routes,
              itemRender
            }}
            subTitle="This is a subtitle"
            extra={[
              <Button
                onClick={() => {
                  history.push(`/portfolios/${portfolio[0].id}/add-company`);
                }}
              >
                + Company
              </Button>
            ]}
          />
          <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
            <CompaniesContext.Provider value={companiesContext}>
              <CompanyListTable portfolioId={id} />
            </CompaniesContext.Provider>
          </Layout>
        </>
      )}
    </>
  );
};

export default PortfolioDetailsRoute;

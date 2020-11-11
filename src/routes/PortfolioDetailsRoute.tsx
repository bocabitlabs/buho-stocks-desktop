import React, { useContext, useEffect } from "react";

import { Button, Layout, message, PageHeader, Popconfirm } from "antd";

import { Link, useHistory, useParams } from "react-router-dom";
import CompanyListTable from "../components/CompanyListTable/CompanyListTable";
import { useCompaniesContext } from "../hooks/companies";
import { CompaniesContext } from "../contexts/companies";
import { PortfoliosContext } from "../contexts/portfolios";
import PortfolioService from "../services/portfolio-service";

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
      breadcrumbName: portfolio ? portfolio.name : ""
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  function confirm(e: any) {
    console.log(e);
    const result = new PortfolioService().deletePortfolioById(id);
    if (result === "OK") {
      history.push({
        pathname: "/home",
        state: { message: "portfolio-deleted" }
      });
    }
  }

  function cancel(e: any) {
    console.log(e);
    message.error("Click on No");
  }
  return (
    <>
      {portfolio && (
        <>
          <PageHeader
            title={`${portfolio.name}`}
            breadcrumb={{
              routes,
              itemRender
            }}
            subTitle="This is a subtitle"
            extra={[
              <Button
                key={"company-add-header"}
                onClick={() => {
                  history.push(`/portfolios/${portfolio.id}/add-company`);
                }}
              >
                + Company
              </Button>,
              <Popconfirm
                key={"portfolio-delete-header"}
                title="Delete this portfolio?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button>Delete</Button>
              </Popconfirm>
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

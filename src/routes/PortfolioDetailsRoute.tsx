import React, { useEffect, useState } from "react";

import { Button, Layout, PageHeader } from "antd";

import AddCompanyForm from "../components/AddCompanyForm/AddCompanyForm";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPortfolioById } from "../daos/portfolio-dao";
import { PortfolioFields } from "../types/portfolio";
import CompanyListTable from "../components/CompanyListTable/CompanyListTable";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetailsRoute = () => {
  const history = useHistory();
  const [portfolios, setPortfolios] = useState<PortfolioFields[]>([]);

  const { id } = useParams<IPortfolioRouteParams>();

  useEffect(() => {
    getPortfolioById(id, setPortfolios);
  }, [id]);

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
        portfolios.length > 0 && portfolios[0] ? portfolios[0].name : ""
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      {portfolios.length > 0 && (
        <>
          <PageHeader
            title={`${portfolios[0].name}`}
            breadcrumb={{
              routes,
              itemRender
            }}
            subTitle="This is a subtitle"
            extra={[
              <Button
                onClick={() => {
                  history.push(`/portfolios/${portfolios[0].id}/add-company`);
                }}
              >
                + Company
              </Button>
            ]}
          />
          <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
            {JSON.stringify(portfolios)}
            <CompanyListTable/>
          </Layout>
        </>
      )}
    </>
  );
};

export default PortfolioDetailsRoute;

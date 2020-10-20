import React, { useEffect, useState } from "react";

import { Layout, PageHeader } from "antd";

import { Link, useParams } from "react-router-dom";
import { PortfolioFields } from "../types/portfolio";
import { getPortfolioById } from "../daos/portfolio-dao";
import AddCompanyForm from "../components/AddCompanyForm/AddCompanyForm";

export interface IAddCompanyRouteParams {
  id: string;
}

interface IState {
  portfolio: PortfolioFields;
}

const AddCompanyRoute = () => {
  const [portfolios, setPortfolios] = useState<PortfolioFields[]>([]);
  const { id } = useParams<IAddCompanyRouteParams>();

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
    },
    {
      path: `/portfolios/${id}/add-company`,
      name: "add-currency",
      breadcrumbName: "Add company"
    }
  ];

  useEffect(() => {
    getPortfolioById(id, setPortfolios);
  }, [id]);

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Add a company"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        {JSON.stringify(portfolios[0])}
        <AddCompanyForm />
      </Layout>
    </>
  );
};

export default AddCompanyRoute;

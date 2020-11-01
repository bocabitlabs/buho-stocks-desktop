import React, { useContext, useEffect } from "react";

import { Layout, PageHeader } from "antd";

import { Link, useParams } from "react-router-dom";
import { PortfolioFields } from "../types/portfolio";
import AddCompanyForm from "../components/AddCompanyForm/AddCompanyForm";
import { PortfoliosContext } from "../contexts/portfolios";
import { CompaniesContext } from "../contexts/companies";
import { useCompaniesContext } from "../hooks/companies";

export interface IAddCompanyRouteParams {
  id: string;
}

interface IState {
  portfolio: PortfolioFields;
}

const AddCompanyRoute = () => {
  const { portfolio, fetchPortfolio } = useContext(PortfoliosContext);
  const companiesContext = useCompaniesContext();

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
        portfolio.length > 0 && portfolio[0] ? portfolio[0].name : ""
    },
    {
      path: `/portfolios/${id}/add-company`,
      name: "add-currency",
      breadcrumbName: "Add company"
    }
  ];

  useEffect(() => {
    fetchPortfolio(id);
  }, [id, fetchPortfolio]);

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
        <CompaniesContext.Provider value={companiesContext}>
          <AddCompanyForm portfolioID={id} />
        </CompaniesContext.Provider>
      </Layout>
    </>
  );
};

export default AddCompanyRoute;

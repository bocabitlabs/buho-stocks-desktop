import React, { useContext, useEffect } from "react";

import { Layout, PageHeader } from "antd";

import { Link, useParams } from "react-router-dom";
import { CompaniesContext } from "../../contexts/companies";
import AddShareForm from "../../components/AddShareForm/AddShareForm";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const AddShareRoute = () => {
  // const { portfolio, fetchPortfolio } = useContext(PortfoliosContext);
  const { company, fetchCompany } = useContext(CompaniesContext);
  const { portfolioId, companyId } = useParams<Props>();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: company ? company.portfolioName : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}`,
      name: "company-details",
      breadcrumbName: company ? company.name : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${company?.id}/add-shares`,
      name: "add_shares",
      breadcrumbName: "+ Add Shares"
    }
  ];

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Add Shares"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <AddShareForm companyId={companyId} />
      </Layout>
    </>
  );
};

export default AddShareRoute;
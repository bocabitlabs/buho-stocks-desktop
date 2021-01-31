import { PageHeader } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function RightsTransactionAddHeader({
  companyId,
  portfolioId
}: Props): ReactElement {
  const { company, fetchCompany } = useContext(CompaniesContext);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

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
      path: `/portfolios/${portfolioId}/companies/${companyId}?tab=rights`,
      name: "company-details",
      breadcrumbName: company ? company.name : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}/add-rights`,
      name: "add_rights",
      breadcrumbName: "+ Add Rights"
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
    <PageHeader
      className="site-page-header"
      title="Add Rights"
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}

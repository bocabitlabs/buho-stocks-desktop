import { PageHeader } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfoliosContext } from "contexts/portfolios";
import { CompaniesContext } from "contexts/companies";

interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyEditHeader({
  portfolioId,
  companyId
}: Props): ReactElement | null {
  const { portfolio, getById: getPortfolioById } = useContext(
    PortfoliosContext
  );
  const { company, fetchCompany: getCompanyById } = useContext(
    CompaniesContext
  );

  useEffect(() => {
    getPortfolioById(portfolioId);
    getCompanyById(companyId);
  }, [portfolioId, getPortfolioById, companyId, getCompanyById]);

  if (!company) {
    return null;
  }

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: portfolio ? portfolio.name : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}`,
      name: "company",
      breadcrumbName: company ? company.name : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}/edit`,
      name: "edit-company",
      breadcrumbName: "Edit"
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
    <PageHeader
      className="site-page-header"
      title={`Edit company ${company.name}`}
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}

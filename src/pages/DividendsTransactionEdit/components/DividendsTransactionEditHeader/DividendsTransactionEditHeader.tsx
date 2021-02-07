import { PageHeader } from "antd";
import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";

interface Props {
  companyId: string;
  portfolioId: string;
  transactionId: string;
}

export default function DividendsTransactionEditdHeader({
  companyId,
  portfolioId,
  transactionId
}: Props): ReactElement {
  const { company } = useContext(CompaniesContext);

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
      path: `/portfolios/${portfolioId}/companies/${companyId}/dividends/${transactionId}`,
      name: "edit_dividends",
      breadcrumbName: "Edit Dividens transaction"
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
    <PageHeader
      className="site-page-header"
      title="Edit dividends transaction"
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}

import { PageHeader } from 'antd';
import React, { ReactElement, useContext } from 'react'
import { Link } from 'react-router-dom';
import { CompaniesContext } from '../../contexts/companies';

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function AddDividendRouteHeader({companyId, portfolioId}: Props): ReactElement {
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
      path: `/portfolios/${portfolioId}/companies/${companyId}/add-dividends`,
      name: "add_dividends",
      breadcrumbName: "+ Add Dividends"
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
    <PageHeader
        className="site-page-header"
        title="Add dividends"
        breadcrumb={{
          routes,
          itemRender
        }}
        subTitle="This is a subtitle"
      />
  )
}

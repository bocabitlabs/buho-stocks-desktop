import React, { ReactElement, useContext, useEffect } from 'react'

import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import { PortfoliosContext } from 'contexts/portfolios';

interface Props {
  portfolioId: string;
}

export default function TransactionsLogListHeader({portfolioId}: Props): ReactElement {
  const { portfolio, getById } = useContext(PortfoliosContext);

  useEffect(() => {
    getById(portfolioId);
  }, [portfolioId, getById]);

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
      path: `/portfolios/${portfolioId}/logs`,
      name: "logs",
      breadcrumbName: "Logs"
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
    <PageHeader
      className="site-page-header"
      title="Logs"
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}


import { PageHeader } from "antd";
import React, { ReactElement, useContext } from "react";
import { Link } from "react-router-dom";
import { PortfolioContext } from "../../contexts/portfolio";

interface Props {
  portfolioId: string;
}

export default function AddCompanyRouteHeader({
  portfolioId
}: Props): ReactElement {
  const { portfolio } = useContext(PortfolioContext);

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
      path: `/portfolios/${portfolioId}/add-company`,
      name: "add-currency",
      breadcrumbName: "Add company"
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  return (
    <PageHeader
      className="site-page-header"
      title="Add a company"
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
    />
  );
}
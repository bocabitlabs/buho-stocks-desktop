import { PageHeader } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PortfoliosContext } from "../../../../contexts/portfolios";

interface Props {
  portfolioId: string;
}

export default function CompanyAddHeader({ portfolioId }: Props): ReactElement {
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
      path: `/portfolios/${portfolioId}/companies/add`,
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

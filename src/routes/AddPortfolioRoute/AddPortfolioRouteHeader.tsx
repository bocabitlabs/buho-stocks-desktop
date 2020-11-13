import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function AddPortfolioRouteHeader(): ReactElement {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-portfolio",
      name: "add-portfolio",
      breadcrumbName: "Add portfolio"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Add a portfolio"
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
    />
  );
}

import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";


export default function MarketAddRouteHeader(): ReactElement {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-market",
      name: "add-market",
      breadcrumbName: "Add market"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Add a market"
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
    />
  );
}

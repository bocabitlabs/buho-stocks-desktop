import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function AddSectorRouteHeader(): ReactElement {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/add-sector",
      name: "add-sector",
      breadcrumbName: "Add sector"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Add a sector"
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
    />
  );
}

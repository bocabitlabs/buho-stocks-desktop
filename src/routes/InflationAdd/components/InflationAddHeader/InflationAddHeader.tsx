import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";


export default function InflationAddHeader(): ReactElement {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/inflations",
      name: "inflations",
      breadcrumbName: "Inflations"
    },
    {
      path: "/add-inflation",
      name: "add-inflation",
      breadcrumbName: "Add inflation"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Add a inflation"
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
    />
  );
}

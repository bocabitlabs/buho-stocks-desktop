import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function CsvImportHeader(): ReactElement {

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/csv-import",
      name: "csv",
      breadcrumbName: "CSV Import"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="CSV Import"
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}

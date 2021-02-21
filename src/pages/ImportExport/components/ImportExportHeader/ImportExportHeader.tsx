import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function ImportExportHeader(): ReactElement {

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: "/import-export",
      name: "import-export",
      breadcrumbName: "Import & Export"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Import & Export"
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}

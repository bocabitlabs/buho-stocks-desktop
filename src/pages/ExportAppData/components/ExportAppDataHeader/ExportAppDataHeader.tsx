import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";


export default function ExportAppDataHeader(): ReactElement {
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
    },
    {
      path: "/export",
      name: "export",
      breadcrumbName: "Export app data"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Export app data"
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}

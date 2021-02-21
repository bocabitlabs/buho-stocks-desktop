import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";


export default function ImportAppDataHeader(): ReactElement {
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
      path: "/import",
      name: "import",
      breadcrumbName: "Import data"
    },
    {
      path: "/import/app-data",
      name: "import",
      breadcrumbName: "App"
    }
  ];
  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }
  return (
    <PageHeader
      className="site-page-header"
      title="Import App data"
      breadcrumb={{
        routes,
        itemRender
      }}
    />
  );
}

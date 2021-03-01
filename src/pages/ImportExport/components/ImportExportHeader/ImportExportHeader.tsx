import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function ImportExportHeader(): ReactElement {

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/import-export",
      name: "import-export",
      breadcrumbName: "Import & Export"
    }
  ];
  return (
    <PageHeader
      className="site-page-header"
      title="Import & Export"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

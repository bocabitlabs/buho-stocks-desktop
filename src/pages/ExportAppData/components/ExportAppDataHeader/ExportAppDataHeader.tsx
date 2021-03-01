import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";


export default function ExportAppDataHeader(): ReactElement {
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
    },
    {
      path: "/export",
      name: "export",
      breadcrumbName: "Export app data"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Export app data"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

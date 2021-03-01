import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function CsvImportHeader(): ReactElement {

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
      path: "/import",
      name: "import",
      breadcrumbName: "Import"
    },
    {
      path: "/import/broker",
      name: "import-broker",
      breadcrumbName: "Broker"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="CSV Import"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

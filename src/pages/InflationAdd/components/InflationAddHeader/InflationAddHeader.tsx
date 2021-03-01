import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";


export default function InflationAddHeader(): ReactElement {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
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

  return (
    <PageHeader
      className="site-page-header"
      title="Add a inflation"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

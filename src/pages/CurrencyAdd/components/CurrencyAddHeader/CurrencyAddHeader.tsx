import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";


export default function CurrencyAddHeader(): ReactElement {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/add-currency",
      name: "add-currency",
      breadcrumbName: "Add currency"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Add a currency"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

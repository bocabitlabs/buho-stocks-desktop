import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function PortfolioAddHeader(): ReactElement {
  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/add-portfolio",
      name: "add-portfolio",
      breadcrumbName: "Add portfolio"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Add a portfolio"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      subTitle="This is a subtitle"
    />
  );
}

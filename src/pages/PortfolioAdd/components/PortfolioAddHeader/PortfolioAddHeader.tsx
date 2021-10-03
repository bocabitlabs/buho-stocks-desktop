import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function PortfolioAddHeader(): ReactElement {
  const { t } = useTranslation();

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: t("Home"),
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/add-portfolio",
      name: "add-portfolio",
      breadcrumbName: t("Add portfolio")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={t("Add portfolio")}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

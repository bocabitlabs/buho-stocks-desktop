import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function SectorAddHeader(): ReactElement {
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
      path: "/add-sector",
      name: "add-sector",
      breadcrumbName: t("Add sector")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={t("Add sector")}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

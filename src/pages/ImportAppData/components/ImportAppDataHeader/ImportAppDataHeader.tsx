import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbItemRender } from "utils/headers-utils";


export default function ImportAppDataHeader(): ReactElement {
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
      path: "/import-export",
      name: "import-export",
      breadcrumbName: t("Import & Export")
    },
    {
      path: "/import",
      name: "import",
      breadcrumbName: t("Import data")
    },
    {
      path: "/import/app-data",
      name: "import",
      breadcrumbName: t("App")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={t("Import App Data")}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

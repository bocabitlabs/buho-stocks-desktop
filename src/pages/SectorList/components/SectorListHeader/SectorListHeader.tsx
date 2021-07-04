import { ClusterOutlined, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function SectorListRouteHeader(): ReactElement {
  const history = useHistory();
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
      path: "/sectors",
      name: "sectors",
      breadcrumbName: t("Sectors")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={<><ClusterOutlined /> {t("Sectors")}</>}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      extra={[
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            history.push("/add/sector");
          }}
        >
          {t("Add sector")}
        </Button>
      ]}
    />
  );
}

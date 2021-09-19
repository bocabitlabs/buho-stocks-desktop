import { BankTwoTone, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function MarketListRouteHeader(): ReactElement {
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
      path: "/markets",
      name: "market",
      breadcrumbName: t("Markets")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={<><BankTwoTone twoToneColor={"#505050"} /> {t("Markets")}</>}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      extra={[
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            history.push("/add/market");
          }}
        >
          {t("Add market")}
        </Button>
      ]}
    />
  );
}

import { DollarCircleTwoTone, HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { breadcrumbItemRender } from "utils/headers-utils";

export default function CurrencyListHeader(): ReactElement {
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
      path: "/currencies",
      name: "currencies",
      breadcrumbName: t("Currencies")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={<><DollarCircleTwoTone twoToneColor="#52c41a" /> {t("Currencies")}</>}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      extra={[
        <Button
          type="primary"
          icon={<PlusOutlined/>}
          onClick={() => {
            history.push("/add/currency");
          }}
        >
          {t("Add currency")}
        </Button>
      ]}
    />
  );
}

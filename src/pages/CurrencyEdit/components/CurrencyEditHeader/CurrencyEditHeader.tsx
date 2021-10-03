import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { CurrenciesContext } from "contexts/currencies";
import React, { ReactElement, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbItemRender } from "utils/headers-utils";

interface Props {
  currencyId: string;
}

export default function CurrencyEditHeader({
  currencyId
}: Props): ReactElement | null {

  const { currency, getById: getCurrencyById } = useContext(
    CurrenciesContext
  );
  const { t } = useTranslation();


  useEffect(() => {
    getCurrencyById(currencyId);
  }, [getCurrencyById, currencyId]);

  if (!currency) {
    return null;
  }

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
    },
    {
      path: `/currencies/${currencyId}/edit`,
      name: "edit",
      breadcrumbName: t("Edit")
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title={t("Edit")}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

import { HomeOutlined } from "@ant-design/icons";
import { PageHeader } from "antd";
import { CurrenciesContext } from "contexts/currencies";
import React, { ReactElement, useContext, useEffect } from "react";
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
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: "/currencies",
      name: "currencies",
      breadcrumbName: "Currencies"
    },
    {
      path: `/currencies/${currencyId}/edit`,
      name: "edit",
      breadcrumbName: "Edit"
    }
  ];

  return (
    <PageHeader
      className="site-page-header"
      title="Edit"
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
    />
  );
}

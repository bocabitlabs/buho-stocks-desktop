import { Button, PageHeader } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default function HomeRouteHeader(): ReactElement {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <PageHeader
      title={t("Home")}
      extra={[
        <Button
          key={"portfolio-add-header"}
          onClick={() => {
            history.push("/add/portfolio");
          }}
        >
          {t("Add portfolio")}
        </Button>,
        <Button
          key={"currency-add-header"}
          onClick={() => {
            history.push("/add/currency");
          }}
        >
          {t("Add currency")}
        </Button>,
        <Button
          key={"market-add-header"}
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

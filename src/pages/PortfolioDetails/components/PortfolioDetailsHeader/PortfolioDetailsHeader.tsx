import { message } from "antd";
import Button from "antd/lib/button";
import PageHeader from "antd/lib/page-header";
import Popconfirm from "antd/lib/popconfirm";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { PortfoliosContext } from "contexts/portfolios";
import PortfolioService from "services/portfolios/portfolios-service";
import {
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  LineChartOutlined,
  PlusOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { breadcrumbItemRender } from "utils/headers-utils";
import CountryFlag from "components/CountryFlag/CountryFlag";
import { useTranslation } from "react-i18next";

interface Props {
  portfolioId: string;
}

export default function PortfolioDetailsHeader({
  portfolioId
}: Props): ReactElement | null {
  const history = useHistory();
  const { portfolio, getAll, getById } = useContext(PortfoliosContext);
  const key = "updatable";
  const { t } = useTranslation();

  useEffect(() => {
    if (portfolioId === undefined || portfolioId === null) {
      console.error("portfolioId is undefined. This will lead to errors");
    }
    getById(portfolioId);
  }, [portfolioId, getById]);

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: t("Home"),
      icon: <HomeOutlined />,
      iconOnly: true
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: portfolio ? portfolio.name : ""
    }
  ];

  function confirm(e: any) {
    const result = PortfolioService.deleteById(portfolioId);
    if (result.changes) {
      getAll();
      message.success({
        content: t("Portfolio has been deleted"),
        key,
        duration: 2
      });
      history.push("/home");
    }
  }

  function cancel(e: any) {
    message.error("Click on No");
  }

  if (portfolio === null) {
    return null;
  }

  return (
    <PageHeader
      title={portfolio?.name}
      subTitle={portfolio?.description}
      breadcrumb={{
        routes,
        itemRender: breadcrumbItemRender
      }}
      tags={[<CountryFlag code={portfolio.currencyCountryCode} />]}
      extra={[
        <Button
          type="primary"
          key={"company-add-header"}
          icon={<PlusOutlined />}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/companies/add`);
          }}
        >
          {t("Company")}
        </Button>,
        <Button
          key={"company-view-logs"}
          icon={<UnorderedListOutlined />}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/log`);
          }}
          title={t("View company logs")}
        />,
        <Button
          icon={<LineChartOutlined />}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/charts`);
          }}
          title={t("View portfolio charts")}
        />,
        <Button
          key={"edit"}
          icon={<EditOutlined />}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/edit`);
          }}
        >
          {t("Edit")}
        </Button>,
        <Popconfirm
          key={"portfolio-delete-header"}
          title="Delete this portfolio?"
          onConfirm={confirm}
          onCancel={cancel}
          okText={t("Yes")}
          cancelText={t("No")}
        >
          <Button icon={<DeleteOutlined />} danger>
            {t("Delete")}
          </Button>
        </Popconfirm>
      ]}
    />
  );
}

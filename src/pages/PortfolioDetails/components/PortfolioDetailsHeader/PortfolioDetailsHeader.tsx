import { message } from "antd";
import Button from "antd/lib/button";
import PageHeader from "antd/lib/page-header";
import Popconfirm from "antd/lib/popconfirm";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { PortfoliosContext } from "contexts/portfolios";
import PortfolioService from "services/portfolio-service";
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

interface Props {
  portfolioId: string;
}

export default function PortfolioDetailsHeader({
  portfolioId
}: Props): ReactElement | null {
  const history = useHistory();
  const { portfolio, getAll, getById } = useContext(PortfoliosContext);
  const key = "updatable";

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
      breadcrumbName: "Home",
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
        content: "Portfolio has been deleted",
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
          Company
        </Button>,
        <Button
          key={"company-view-logs"}
          icon={<UnorderedListOutlined />}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/log`);
          }}
          title="View company logs"
        />,
        <Button
        icon={<LineChartOutlined />}
        onClick={() => {
          history.push(`/portfolios/${portfolioId}/charts`);
        }}
        title="View portfolio charts"
      />,
        <Button
          key={"edit"}
          icon={<EditOutlined />}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/edit`);
          }}
        >
          Edit
        </Button>,
        <Popconfirm
          key={"portfolio-delete-header"}
          title="Delete this portfolio?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Popconfirm>
      ]}
    />
  );
}

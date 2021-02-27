import { message } from "antd";
import Button from "antd/lib/button";
import PageHeader from "antd/lib/page-header";
import Popconfirm from "antd/lib/popconfirm";
import React, { ReactElement, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { PortfoliosContext } from "contexts/portfolios";
import PortfolioService from "services/portfolio-service";
import {
  DeleteOutlined,
  PlusOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

interface Props {
  portfolioId: string;
}

export default function PortfolioDetailsHeader({
  portfolioId
}: Props): ReactElement {
  const history = useHistory();
  const { portfolio, getAll, getById } = useContext(PortfoliosContext);
  const key = "updatable";

  useEffect(() => {
    if (portfolioId === undefined || portfolioId === null) {
      console.error("portfolioId is undefined. This will lead to errors");
    }
    console.log("Fetching portfolio", portfolioId);
    getById(portfolioId);
  }, [portfolioId, getById]);

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: portfolio ? portfolio.name : ""
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

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
    console.log(e);
    message.error("Click on No");
  }

  console.log("PortfolioDetailsHeader: portfolio=", portfolio);

  return (
    <PageHeader
      title={`${portfolio?.name}`}
      breadcrumb={{
        routes,
        itemRender
      }}
      extra={[
        <Button
          key={"company-add-header"}
          icon={<PlusOutlined />}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/add-company`);
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
        >
          View Logs
        </Button>,
        <Popconfirm
          key={"portfolio-delete-header"}
          title="Delete this portfolio?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />}>Delete</Button>
        </Popconfirm>
      ]}
    />
  );
}

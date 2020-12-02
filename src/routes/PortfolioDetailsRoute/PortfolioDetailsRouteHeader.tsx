import { message } from "antd";
import Button from "antd/lib/button";
import PageHeader from "antd/lib/page-header";
import Popconfirm from "antd/lib/popconfirm";
import React, { ReactElement, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { PortfoliosContext } from "../../contexts/portfolios";
import PortfolioService from "../../services/portfolio-service";

interface Props {
  portfolioId: string;
}

export default function PortfolioDetailsRouteHeader({
  portfolioId
}: Props): ReactElement {
  const history = useHistory();
  const { portfolio, fetchPortfolios, fetchPortfolio } = useContext(PortfoliosContext);
  const key = "updatable";

  useEffect(() => {
    fetchPortfolio(portfolioId)
  }, [portfolioId, fetchPortfolio])

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
    console.log(e);
    const result = new PortfolioService().deleteById(portfolioId);
    if (result.changes) {
      fetchPortfolios();
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

  return (
    <PageHeader
      title={`${portfolio?.name}`}
      breadcrumb={{
        routes,
        itemRender
      }}
      subTitle="This is a subtitle"
      extra={[
        <Button
          key={"company-add-header"}
          onClick={() => {
            history.push(`/portfolios/${portfolioId}/add-company`);
          }}
        >
          + Company
        </Button>,
        <Popconfirm
          key={"portfolio-delete-header"}
          title="Delete this portfolio?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button>Delete</Button>
        </Popconfirm>
      ]}
    />
  );
}

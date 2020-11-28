import { Button, Modal, PageHeader, Tag } from "antd";
import React, { ReactElement, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AddStockPriceForm from "../../components/AddStockPriceForm/AddStockPriceForm";
import { CompanyContext } from "../../contexts/company";

interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsRouteHeader({
  portfolioId,
  companyId
}: Props): ReactElement {
  const history = useHistory();
  const { company } = useContext(CompanyContext);
  const [visible, setVisible] = useState(false);

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: company ? company.portfolioName : ""
    },
    {
      path: `/portfolios/${portfolioId}/companies/${companyId}`,
      name: "company-details",
      breadcrumbName: company ? company.name : ""
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };
  // TODO: Finish this
  return (
    <>
      <PageHeader
        title={`${company?.name}`}
        onBack={() => history.push(`/portfolios/${portfolioId}`)}
        tags={
          <Tag color="blue">
            <a href={`${company?.url}`}>Link</a>
          </Tag>
        }
        breadcrumb={{
          routes,
          itemRender
        }}
        extra={[
          <Button
            key={"add-shares-button"}
            onClick={() => {
              history.push(
                `/portfolios/${portfolioId}/companies/${company?.id}/add-shares`
              );
            }}
          >
            + Shares
          </Button>,
          <Button
            key={"add-dividends-button"}
            onClick={() => {
              history.push(
                `/portfolios/${portfolioId}/companies/${company?.id}/add-dividends`
              );
            }}
          >
            + Dividends
          </Button>,
          <Button
            key={"add-stock-price-button"}
            onClick={() => {
              showModal();
            }}
          >
            + Stock Price
          </Button>
        ]}
      />
      <Modal
        title="Add a stock price"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {company && (
          <AddStockPriceForm
            companyId={companyId}
            currencySymbol={company?.currencySymbol}
          />
        )}
      </Modal>
    </>
  );
}

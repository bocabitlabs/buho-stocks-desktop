import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, PageHeader, Tag } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import StockPriceAddModal from "../StockPriceAddModal/StockPriceAddModal";
import StockPriceListModal from "../StockPriceListModal/StockPriceListModal";

interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsRouteHeader({
  portfolioId,
  companyId
}: Props): ReactElement | null {
  const history = useHistory();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const [addStockModalVisible, setAddStockModalVisible] = useState(false);
  const [listStockModalVisible, setListStockModalVisible] = useState(false);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

  if (company === null) {
    return null;
  }

  const routes = [
    {
      path: "/home",
      name: "home",
      breadcrumbName: "Home"
    },
    {
      path: `/portfolios/${company.portfolioId}`,
      name: "portfolio-details",
      breadcrumbName: company.portfolioName
    },
    {
      path: `/portfolios/${company.portfolioId}/companies/${company.id}`,
      name: "company-details",
      breadcrumbName: company.name
    }
  ];

  function itemRender(route: any) {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  }

  const showAddStockPriceModal = () => {
    setAddStockModalVisible(true);
  };

  const showListStockPriceModal = () => {
    setListStockModalVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          showAddStockPriceModal();
        }}
      >
        Add stock price
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          showListStockPriceModal();
        }}
      >
        List stock prices
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={menu}>
        <Button
          style={{
            border: "none",
            padding: 0
          }}
        >
          <EllipsisOutlined
            style={{
              fontSize: 20,
              verticalAlign: "top"
            }}
          />
        </Button>
      </Dropdown>
    );
  };

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
            key={"company-edit-header"}
            icon={<EditOutlined />}
            onClick={() => {
              console.log(`/portfolios/${portfolioId}/companies/${companyId}/edit`)
              history.push(
                `/portfolios/${portfolioId}/companies/${companyId}/edit`
              );
            }}
          >
            Edit
          </Button>,
          <DropdownMenu key="more" />
        ]}
      />
      {company && (
        <StockPriceAddModal
          currencySymbol={company.currencySymbol}
          visible={addStockModalVisible}
          setVisible={setAddStockModalVisible}
        />
      )}
      {company && (
        <StockPriceListModal
          currencySymbol={company.currencySymbol}
          visible={listStockModalVisible}
          setVisible={setListStockModalVisible}
        />
      )}
    </>
  );
}

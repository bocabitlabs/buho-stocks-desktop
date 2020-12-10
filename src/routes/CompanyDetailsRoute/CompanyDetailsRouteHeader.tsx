import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, PageHeader, Tag } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import StockPriceAddModal from "../../components/StockPriceAddModal/StockPriceAddModal";
import StockPriceListModal from "../../components/StockPriceListModal/StockPriceListModal";
import { CompaniesContext } from "../../contexts/companies";

interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsRouteHeader({
  portfolioId,
  companyId
}: Props): ReactElement {
  const history = useHistory();
  const { company, fetchCompany } = useContext(CompaniesContext);
  const [addStockModalVisible, setAddStockModalVisible] = useState(false);
  const [listStockModalVisible, setListStockModalVisible] = useState(false);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

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
        extra={[<DropdownMenu key="more" />]}
      />
      {company && (
        <StockPriceAddModal
          companyId={companyId}
          currencySymbol={company.currencySymbol}
          visible={addStockModalVisible}
          setVisible={setAddStockModalVisible}
        />
      )}
      {company && (
        <StockPriceListModal
          companyId={companyId}
          currencySymbol={company.currencySymbol}
          visible={listStockModalVisible}
          setVisible={setListStockModalVisible}
        />
      )}
    </>
  );
}

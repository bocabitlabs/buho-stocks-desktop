import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  HomeOutlined,
  LinkOutlined
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Menu,
  message,
  PageHeader,
  Popconfirm,
  Tag
} from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import StockPriceAddModal from "../StockPriceAddModal/StockPriceAddModal";
import StockPriceListModal from "../StockPriceListModal/StockPriceListModal";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import { breadcrumbItemRender } from "utils/headers-utils";
import CountryFlag from "components/CountryFlag/CountryFlag";

interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsHeader({
  portfolioId,
  companyId
}: Props): ReactElement | null {
  const history = useHistory();
  const {
    company,
    getById: fetchCompany,
    deleteById: deleteCompany,
    getAll: fetchCompanies
  } = useContext(CompaniesContext);
  const [addStockModalVisible, setAddStockModalVisible] = useState(false);
  const [listStockModalVisible, setListStockModalVisible] = useState(false);
  const key = "updatable";

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
      breadcrumbName: "Home",
      icon: <HomeOutlined />,
      iconOnly: true
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

  function confirm(e: any) {
    const comapnyName = company?.name;
    const companyticker = company?.ticker;
    const result = deleteCompany(companyId);
    if (result.changes) {
      TransactionLogService.create({
        type: "Remove company",
        message: `Removed company "${comapnyName} (${companyticker}) - #${companyId}"`,
        portfolioId: +portfolioId
      });
      fetchCompanies(portfolioId);
      message.success({
        content: "Company has been deleted",
        key,
        duration: 2
      });
      history.push(`/portfolios/${portfolioId}`);
    }
  }

  return (
    <>
      <PageHeader
        title={company?.name}
        subTitle={company.ticker}
        onBack={() => history.push(`/portfolios/${portfolioId}`)}
        tags={[
          <Tag color="#fff"><CountryFlag code={company.countryCode} /></Tag>,
          <Tag color="blue">
            <a href={`${company?.url}`}>
              <LinkOutlined />
            </a>
          </Tag>
        ]}
        breadcrumb={{
          routes,
          itemRender: breadcrumbItemRender
        }}
        extra={[
          <Button
            key={"company-edit-header"}
            icon={<EditOutlined />}
            onClick={() => {
              history.push(
                `/portfolios/${portfolioId}/companies/${companyId}/edit`
              );
            }}
          >
            Edit
          </Button>,
          <Popconfirm
            key={"delete-header"}
            title="Delete this company? All it's content will be removed too."
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>,
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

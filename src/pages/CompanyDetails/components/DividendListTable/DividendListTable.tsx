import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";
import { StringUtils } from "utils/string-utils";
import { IDividendsTransaction } from "types/dividends-transaction";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import { CompaniesContext } from "contexts/companies";
import { useTranslation } from "react-i18next";

interface IProps {
  portfolioId: string;
  companyId: string;
}

export default function DividendListTable({ portfolioId, companyId }: IProps) {
  const { dividendsTransactions, deleteById, getAll: getAllDividendsTransactions } = useContext(
    DividendsTransactionsContext
  );
  const { company } = useContext(CompaniesContext);
  const history = useHistory();
  const { t } = useTranslation();

  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      const info = document.getElementById("sidebar") as HTMLDivElement;

      if (info !== null) {
        setSidebarWidth(info.offsetWidth);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function confirm(recordId: string) {
    const result = deleteById(recordId);
    if (result.changes) {
      if (company) {
        TransactionLogService.create({
          type: t("Dividends transaction"),
          message: `Removed dividends transaction "${company.name} (${company.ticker})": ${recordId}`,
          portfolioId: +company.portfolioId
        });
      }
      getAllDividendsTransactions();
      history.push({
        pathname: `/portfolios/${portfolioId}/companies/${companyId}`,
        state: {
          message: { type: "success", text: t("Dividends transaction has been deleted") }
        }
      });
    }
  }

  const columns = [
    {
      title: t("Date"),
      dataIndex: "transactionDate",
      key: "transactionDate",
      width: 70,
      render: (text: string, record: any) =>
        moment(new Date(record.transactionDate)).format("DD/MM/YYYY")
    },
    {
      title: t("Number of Shares"),
      dataIndex: "count",
      key: "count",
      width: 70
    },
    {
      title: t("Gross price"),
      dataIndex: "price",
      key: "price",
      width: 70,
      render: (text: number, record: any) =>
        StringUtils.getAmountWithSymbol(text, 2, record.dividendsCurrencySymbol)
    },
    {
      title: t("Commission"),
      dataIndex: "commission",
      key: "commission",
      width: 70,
      render: (text: number, record: any) =>
        StringUtils.getAmountWithSymbol(text, 2, record.dividendsCurrencySymbol)
    },
    {
      title: t("Total"),
      dataIndex: "total",
      key: "total",
      width: 70,
      render: (text: number, record: any) =>
        StringUtils.getAmountWithSymbol(text, 2, record.dividendsCurrencySymbol)
    },
    {
      title: t("Action"),
      key: "action",
      width: 70,
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            key={`sector-delete-${record.key}`}
            title={`Delete sector ${record.name}?`}
            onConfirm={() => confirm(record.key)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button>{t("Delete")}</Button>
          </Popconfirm>
          <Link
            to={`/portfolios/${portfolioId}/companies/${companyId}/dividends/${record.key}/edit`}
          >
            {t("Edit")}
          </Link>
        </Space>
      )
    }
  ];

  const getData = () => {
    const transactions = dividendsTransactions.map(
      (transaction: IDividendsTransaction) => ({
        id: transaction.id,
        key: transaction.id,
        name: "dividend",
        count: transaction.count.toString(),
        transactionDate: transaction.transactionDate,
        price: transaction.price,
        commission: transaction.commission,
        total: transaction.count * transaction.price - transaction.commission,
        notes: transaction.notes,
        currencySymbol: transaction.currencySymbol,
        dividendsCurrencySymbol: company?.dividendsCurrencySymbol
          ? company?.dividendsCurrencySymbol
          : company?.currencySymbol
      })
    );
    return transactions;
  };
  return (
    <>
      <Table
        size="small"
        style={{ maxWidth: `max(500px, ${width - sidebarWidth}px)` }}
        scroll={{ x: 800 }}
        bordered
        columns={columns}
        dataSource={getData()}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.notes}</p>
          ),
          rowExpandable: (record) =>
            record.notes !== "undefined" && record.notes !== undefined
        }}
      />
    </>
  );
}

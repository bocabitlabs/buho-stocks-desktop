import { Button, message, Popconfirm, Space, Table } from "antd";
import { CompaniesContext } from "contexts/companies";
import { SharesTransactionsContext } from "contexts/shares-transactions";
import moment from "moment";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import { ISharesTransaction } from "types/shares-transaction";
import { buySellFormatter } from "utils/table-formatters";

interface IProps {
  portfolioId: string;
  companyId: string;
}

export default function ShareListTable({ portfolioId, companyId }: IProps) {
  const { sharesTransactions, getAll, deleteById } = useContext(
    SharesTransactionsContext
  );
  const { company } = useContext(CompaniesContext);
  const history = useHistory();
  const key = "updatable";

  const [width, setWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const { t } = useTranslation();

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


  function confirm(recordId: string) {
    const result = deleteById(recordId);
    if (result.changes) {
      history.push({
        pathname: `/portfolios/${portfolioId}/companies/${companyId}`,
        state: {
          message: { type: "success", text: "Share has been deleted" }
        }
      });
    }

    if (result.changes) {

      if (company) {
        TransactionLogService.create({
          type: t("Shares transaction"),
          message: `Removed shares transaction "${company.name} (${company.ticker})": ${recordId}`,
          portfolioId: +company.portfolioId
        });
      }

      getAll();
      message.success({
        content: t("Share has been deleted"),
        key,
        duration: 2
      });
    } else {
      message.error({
        content: t("Unable to remove shares"),
        key,
        duration: 2
      });
    }
  }

  const columns = [
    {
      title: "#",
      dataIndex: "type",
      key: "type",
      width: 70,
      render: (text: string, record: any) => buySellFormatter(text)
    },
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
      dataIndex: "sharesNumber",
      key: "sharesNumber",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: t("Gross price"),
      dataIndex: "priceShare",
      key: "priceShare",
      width: 70,
      render: (text: number, record: any) =>
        `${text.toFixed(2)} ${record.currencySymbol}`
    },
    {
      title: t("Commission"),
      dataIndex: "commission",
      key: "commission",
      width: 70,
      render: (text: number, record: any) =>
        `${text.toFixed(2)} ${record.currencySymbol}`
    },
    {
      title: t("Total"),
      dataIndex: "total",
      key: "total",
      width: 70,
      render: (text: number, record: any) =>
        `${text.toFixed(2)} ${record.currencySymbol}`
    },
    {
      title: t("Action"),
      key: "action",
      width: 70,
      render: (text: string, record: any) => (
        <Space>
          <Popconfirm
            key={`shares-delete-${record.key}`}
            title={`Delete shares transaction ${record.name}?`}
            onConfirm={() => confirm(record.key)}
            okText={t("Yes")}
            cancelText={t("No")}
          >
            <Button>{t("Delete")}</Button>
          </Popconfirm>
          <Link
            to={`/portfolios/${portfolioId}/companies/${companyId}/shares/${record.key}/edit`}
          >
            {t("Edit")}
          </Link>
        </Space>
      )
    }
  ];

  const getData = () => {
    const shares2 = sharesTransactions.map((share: ISharesTransaction) => ({
      id: share.id,
      key: share.id,
      name: "share",
      sharesNumber: share.count.toString(),
      type: share.type,
      transactionDate: share.transactionDate,
      priceShare: share.price,
      commission: share.commission,
      total: share.count * share.price + share.commission,
      notes: share.notes,
      currencySymbol: share.currencySymbol
    }));
    return shares2;
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
          rowExpandable: (record) => (record.notes !== "undefined" && record.notes !== undefined)
        }}
      />
    </>
  );
}

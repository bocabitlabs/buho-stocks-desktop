import { Button, message, Popconfirm, Space, Table } from "antd";
import { RightsTransactionContext } from "contexts/rights-transactions";
import moment from "moment";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ShareService from "services/shares-transactions-service";
import { RightsTransaction } from "types/rights-transaction";
import { buySellFormatter } from "utils/table-formatters";

interface IProps {
  portfolioId: string;
  companyId: string;
}

export default function RightsTransactionsTable({ portfolioId, companyId }: IProps) {
  const { rigthsTransactions, fetchRightsTransactions } = useContext(
    RightsTransactionContext
  );
  const [width, setWidth] = useState(window.innerWidth);

  const history = useHistory();
  const key = "updatable";

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function confirm(recordId: string) {
    const result = ShareService.deleteById(recordId);
    if (result === "OK") {
      history.push({
        pathname: `/portfolios/${portfolioId}/companies/${companyId}`,
        state: {
          message: { type: "success", text: "Share has been deleted" }
        }
      });
    }

    if (result.changes) {
      setTimeout(() => {
        message.success({
          content: "Share has been deleted",
          key,
          duration: 2
        });
      }, 1000);
      fetchRightsTransactions();
    } else {
      setTimeout(() => {
        message.error({
          content: "Unable to remove shares",
          key,
          duration: 2
        });
      }, 1000);
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
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      width: 70,
      render: (text: string, record: any) =>
        moment(new Date(record.transactionDate)).format("DD/MM/YYYY")
    },
    {
      title: "Number of Rights",
      dataIndex: "count",
      key: "count",
      width: 70,
      render: (text: string, record: any) => text
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 70,
      render: (text: number, record: any) =>
        `${text.toFixed(2)} ${record.currencySymbol}`
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
      width: 70,
      render: (text: number, record: any) =>
        text
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: 70,
      render: (text: number, record: any) =>
        `${text.toFixed(2)} ${record.currencySymbol}`
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 70,
      render: (text: number, record: any) =>
        `${text.toFixed(2)} ${record.currencySymbol}`
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space>
          <Popconfirm
            key={`sector-delete-${record.key}`}
            title={`Delete sector ${record.name}?`}
            onConfirm={() => confirm(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const getData = () => {
    const shares2 = rigthsTransactions.map((share: RightsTransaction) => ({
      id: share.id,
      key: share.id,
      name: "right",
      count: share.count.toString(),
      type: share.type,
      transactionDate: share.transactionDate,
      price: share.price,
      shares: share.shares,
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
        style={{ maxWidth: `max(500px, ${width - 300}px)` }}
        scroll={{ x: 800 }}
        bordered
        columns={columns}
        dataSource={getData()}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.notes}</p>
          ),
          rowExpandable: (record) => record.notes !== "undefined"
        }}
      />
    </>
  );
}

import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";
import { StringUtils } from "utils/string-utils";
import { DividendsTransaction } from "types/dividends-transaction";

interface IProps {
  portfolioId: string;
  companyId: string;
}

export default function DividendListTable({ portfolioId, companyId }: IProps) {
  const { dividendsTransactions, deleteById, fetchAll } = useContext(
    DividendsTransactionsContext
  );
  const [width, setWidth] = useState(window.innerWidth);

  const history = useHistory();

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
      fetchAll();
      history.push({
        pathname: `/portfolios/${portfolioId}/companies/${companyId}`,
        state: {
          message: { type: "success", text: "Dividend has been deleted" }
        }
      });
    }
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      width: 70,
      render: (text: string, record: any) =>
        moment(new Date(record.transactionDate)).format("DD/MM/YYYY")
    },
    {
      title: "Number of Shares",
      dataIndex: "count",
      key: "count",
      width: 70
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 70,
      render: (text: number, record: any) =>
        StringUtils.getAmountWithSymbol(text, 2, record.currencySymbol)
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: 70,
      render: (text: number, record: any) =>
        StringUtils.getAmountWithSymbol(text, 2, record.currencySymbol)
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 70,
      render: (text: number, record: any) =>
        StringUtils.getAmountWithSymbol(text, 2, record.currencySymbol)
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
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
    const shares2 = dividendsTransactions.map(
      (dividend: DividendsTransaction) => ({
        id: dividend.id,
        key: dividend.id,
        name: "dividend",
        count: dividend.count.toString(),
        transactionDate: dividend.transactionDate,
        price: dividend.price,
        commission: dividend.commission,
        total: dividend.count * dividend.price + dividend.commission,
        notes: dividend.notes,
        currencySymbol: dividend.currencySymbol
      })
    );
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

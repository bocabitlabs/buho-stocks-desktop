import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DividendsContext } from "../../contexts/dividends";
import DividendService from "../../services/dividend-service";
import { DividendItemProps } from "../../types/dividend";
import { DividendUtils } from "../../utils/dividend-utils";

interface IProps {
  portfolioId: string;
  companyId: string;
}

export default function DividendListTable({ portfolioId, companyId }: IProps) {
  const { dividends } = useContext(DividendsContext);
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
    const result = new DividendService().deleteById(recordId);
    if (result === "OK") {
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
      dataIndex: "operationDate",
      key: "operationDate",
      width: 70,
      render: (text: string, record: any) =>
        moment(new Date(record.operationDate)).format("DD/MM/YYYY")
    },
    {
      title: "Number of Shares",
      dataIndex: "sharesNumber",
      key: "sharesNumber",
      width: 70,
      render: (text: string, record: any) => record.sharesNumber
    },
    {
      title: "Price",
      dataIndex: "priceShare",
      key: "priceShare",
      width: 70,
      render: (text: string, record: any) =>
        DividendUtils.getAmountWithSymbol(text, record.currencySymbol)
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      width: 70,
      render: (text: string, record: any) =>
        DividendUtils.getAmountWithSymbol(text, record.currencySymbol)
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      width: 70,
      render: (text: string, record: any) =>
        DividendUtils.getAmountWithSymbol(text, record.currencySymbol)
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
    const shares2 = dividends.map((dividend: DividendItemProps) => ({
      id: dividend.id,
      key: dividend.id,
      name: "dividend",
      sharesNumber: dividend.sharesNumber.toString(),
      operationDate: dividend.operationDate,
      priceShare: dividend.priceShare,
      commission: dividend.commission,
      total: dividend.sharesNumber * dividend.priceShare + dividend.commission,
      notes: dividend.notes,
      currencySymbol: dividend.currencySymbol
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

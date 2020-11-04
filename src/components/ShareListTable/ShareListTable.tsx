import { Space, Table } from "antd";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import { SharesContext } from "../../contexts/shares";
import { ShareItemProps } from "../../types/share";

interface IProps {
  companyId: string;
}

export default function ShareListTable({ companyId }: IProps) {
  const { shares, fetchShares } = useContext(SharesContext);

  useEffect(() => {
    fetchShares(companyId);
  }, [fetchShares, companyId]);

  const columns = [
    {
      title: "#",
      dataIndex: "type",
      key: "type",
      render: (text: string, record: any) => record.type
    },
    {
      title: "Date",
      dataIndex: "operationDate",
      key: "operationDate",
      render: (text: string, record: any) =>
        moment(record.operationDate).format("DD/MM/YYYY")
    },
    {
      title: "Number of Shares",
      dataIndex: "sharesNumber",
      key: "sharesNumber",
      render: (text: string, record: any) => record.sharesNumber
    },
    {
      title: "Price",
      dataIndex: "priceShare",
      key: "priceShare",
      render: (text: string, record: any) => record.priceShare
    },
    {
      title: "Commission",
      dataIndex: "commission",
      key: "commission",
      render: (text: string, record: any) => record.commission
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text: string, record: any) => record.total
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text: string, record: { name: string }) => (
    //     <Space size="middle">
    //       <a>Delete</a>
    //     </Space>
    //   )
    // }
  ];

  const getData = () => {
    const shares2 = shares.map((share: ShareItemProps) => ({
      id: share.id,
      key: share.id,
      name: "share",
      sharesNumber: share.sharesNumber.toString(),
      type: share.type,
      operationDate: share.operationDate,
      priceShare: `${share.priceShare} ${share.currencySymbol}`,
      commission: `${share.commission} ${share.currencySymbol}`,
      total: `${share.sharesNumber * share.priceShare - share.commission} ${share.currencySymbol}`
      // ticker: company.ticker,
      // sector: company.sector,
      // currency: company.currency
    }));
    return shares2;
  };
  return (
    <>
      <Table columns={columns} dataSource={getData()} />
    </>
  );
}

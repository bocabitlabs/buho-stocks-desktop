import { Table } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react'
import TransactionLogService from 'services/transaction-log-service';
import { ITransactionLogMessage } from 'types/transaction-log';

interface Props {
  portfolioId: string;
}

export default function TransactionsLogListTable({portfolioId}: Props): ReactElement {
  const [logs, setLogs] = useState<ITransactionLogMessage[]>([])

  const columns = [
    {
      title: "Date",
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text: string) => text
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => text
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (text: string) => text
    }
  ];

  useEffect(() => {
    const log = TransactionLogService.getAll(portfolioId);
    setLogs(log)

  }, [portfolioId])

  const getData = () => {
    return logs.map((element) => ({
      key: element.id,
      creationDate: element.creationDate,
      type: element.type,
      message: element.message,
    }));
  };

  return (
    <div>
      <Table columns={columns} dataSource={getData()} />
    </div>
  )
}

import { Table, Tag } from "antd";
import moment from "moment";
import React, { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TransactionLogService from "services/transaction-log-service/transaction-log-service";
import { ITransactionLogMessage } from "types/transaction-log";

interface Props {
  portfolioId: string;
}

export default function TransactionsLogListTable({
  portfolioId
}: Props): ReactElement {
  const [logs, setLogs] = useState<ITransactionLogMessage[]>([]);
  const { t } = useTranslation();

  const columns = [
    {
      title: t("Added Date"),
      dataIndex: "creationDate",
      key: "creationDate",
      render: (text: string) => moment(text).format("DD.MM.YYYY hh:mm")
    },
    {
      title: t("Type"),
      dataIndex: "type",
      key: "type",
      render: (text: string) => {
        let color = "";
        if (text === t("Shares transaction")) {
          color = "volcano";
        }
        if (text === t("Stock price")) {
          color = "yellow";
        }
        if (text === t("Dividends transaction")) {
          color = "green";
        }
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        );
      }
    },
    {
      title: t("Message"),
      dataIndex: "message",
      key: "message",
      render: (text: string) => text
    }
  ];

  useEffect(() => {
    const log = TransactionLogService.getAll(portfolioId);
    setLogs(log);
  }, [portfolioId]);

  const getData = () => {
    return logs.map((element) => ({
      key: element.id,
      creationDate: element.creationDate,
      type: element.type,
      message: element.message
    }));
  };

  return (
    <div>
      <Table columns={columns} dataSource={getData()} />
    </div>
  );
}

import { cleanup } from "@testing-library/react";
import { Layout } from "antd";
import input from "antd/lib/input";
import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import TransactionLogService from "services/transaction-log-service";
import TransactionsLogListHeader from "./components/TransactionsLogListHeader/TransactionsLogListHeader";
import TransactionsLogListTable from "./components/TransactionsLogListTable/TransactionsLogListTable";

export interface IProps {
  id: string;
}

export default function PortfolioTransactionsLogList(): ReactElement {
  const { id } = useParams<IProps>();

  return (
    <>
      <TransactionsLogListHeader portfolioId={id} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <TransactionsLogListTable portfolioId={id} />
      </Layout>
    </>
  );
}

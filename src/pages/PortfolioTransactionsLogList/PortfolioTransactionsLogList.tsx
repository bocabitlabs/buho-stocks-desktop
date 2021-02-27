import { Layout } from "antd";
import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
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

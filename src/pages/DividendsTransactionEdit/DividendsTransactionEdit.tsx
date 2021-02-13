import React, { ReactElement } from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";
import { useDividendsTransactionsContext } from "hooks/dividends-transactions";
import { useCompaniesContext } from "hooks/companies";

import DividendsTransactionEditdHeader from "./components/DividendsTransactionEditHeader/DividendsTransactionEditHeader";
import DividendsTransactionAddForm from "components/DividendsTransactionAddForm/DividendsTransactionAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
  transactionId: string;
}

export default function DividendsTransactionEdit(): ReactElement {
  const { portfolioId, companyId, transactionId } = useParams<Props>();
  const dividendsContext = useDividendsTransactionsContext(companyId);
  const companyContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companyContext}>
      <DividendsTransactionsContext.Provider value={dividendsContext}>
        <DividendsTransactionEditdHeader companyId={companyId} portfolioId={portfolioId} transactionId={transactionId}  />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <DividendsTransactionAddForm companyId={companyId} transactionId={transactionId} />
        </Layout>
      </DividendsTransactionsContext.Provider>
    </CompaniesContext.Provider>
  )
}

import React from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { DividendsTransactionsContext } from "contexts/dividends-transactions";
import { useDividendsTransactionsContext } from "hooks/dividends-transaction";
import { useCompaniesContext } from "hooks/companies";

import DividendsTransactionAddHeader from "./components/DividendsTransactionAddHeader/DividendsTransactionAddHeader";
import DividendsTransactionAddForm from "components/DividendsTransactionAddForm/DividendsTransactionAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const DividendsTransactionAdd = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const dividendsContext = useDividendsTransactionsContext(companyId);
  const companyContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companyContext}>
      <DividendsTransactionsContext.Provider value={dividendsContext}>
        <DividendsTransactionAddHeader companyId={companyId} portfolioId={portfolioId} />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <DividendsTransactionAddForm companyId={companyId} />
        </Layout>
      </DividendsTransactionsContext.Provider>
    </CompaniesContext.Provider>
  );
};

export default DividendsTransactionAdd;

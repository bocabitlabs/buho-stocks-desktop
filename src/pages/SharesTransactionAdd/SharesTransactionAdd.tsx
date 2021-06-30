import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { useSharesTransactionsContext } from "../../hooks/shares-transactions/use-shares-transactions-context";
import { useCompaniesContext } from "../../hooks/companies/use-companies-context";
import { CompaniesContext } from "../../contexts/companies";
import ShareAddHeader from "./components/ShareAddHeader/ShareAddHeader";
import { SharesTransactionsContext } from "contexts/shares-transactions";
import SharesTransactionAddForm from "components/SharesTransactionAddForm/SharesTransactionAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const SharesTransactionAdd = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const sharesContext = useSharesTransactionsContext(companyId);
  const companiesContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <SharesTransactionsContext.Provider value={sharesContext}>
        <ShareAddHeader companyId={companyId} portfolioId={portfolioId} />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <SharesTransactionAddForm companyId={companyId} />
        </Layout>
      </SharesTransactionsContext.Provider>
    </CompaniesContext.Provider>
  );
};

export default SharesTransactionAdd;

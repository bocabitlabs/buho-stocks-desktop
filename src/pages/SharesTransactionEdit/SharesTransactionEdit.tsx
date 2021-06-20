import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { useSharesTransactionsContext } from "hooks/shares-transactions";
import { useCompaniesContext } from "hooks/companies/use-companies-context";
import { CompaniesContext } from "contexts/companies";
import { SharesTransactionsContext } from "contexts/shares-transactions";
import SharesTransactionEditHeader from "./components/SharesTransactionEditHeader/SharesTransactionEditHeader";
import SharesTransactionAddForm from "components/SharesTransactionAddForm/SharesTransactionAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
  transactionId: string;
}

const SharesTransactionAdd = () => {
  const { portfolioId, companyId, transactionId } = useParams<Props>();
  const sharesContext = useSharesTransactionsContext(companyId);
  const companiesContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <SharesTransactionsContext.Provider value={sharesContext}>
        <SharesTransactionEditHeader
          companyId={companyId}
          portfolioId={portfolioId}
          transactionId={transactionId}
        />
        <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
          <SharesTransactionAddForm companyId={companyId} transactionId={transactionId} />
        </Layout>
      </SharesTransactionsContext.Provider>
    </CompaniesContext.Provider>
  );
};

export default SharesTransactionAdd;

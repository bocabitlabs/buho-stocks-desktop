import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { useSharesTransactionsContext } from "../../hooks/shares-transactions";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";
import ShareAddHeader from "./components/ShareAddHeader/ShareAddHeader";
import ShareAddForm from "./components/ShareAddForm/ShareAddForm";
import { SharesTransactionsContext } from "contexts/shares-transactions";

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
      <ShareAddHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SharesTransactionsContext.Provider value={sharesContext}>
          <ShareAddForm companyId={companyId} />
        </SharesTransactionsContext.Provider>
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default SharesTransactionAdd;

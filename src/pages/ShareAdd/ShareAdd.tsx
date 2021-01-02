import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import { useSharesContext } from "../../hooks/shares";
import { SharesContext } from "../../contexts/shares";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";
import ShareAddHeader from "./components/ShareAddHeader/ShareAddHeader";
import ShareAddForm from "./components/ShareAddForm/ShareAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const ShareAddRoute = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const sharesContext = useSharesContext(companyId);
  const companiesContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <ShareAddHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SharesContext.Provider value={sharesContext}>
          <ShareAddForm companyId={companyId} />
        </SharesContext.Provider>
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default ShareAddRoute;

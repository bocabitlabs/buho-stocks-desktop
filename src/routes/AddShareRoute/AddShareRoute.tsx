import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import AddShareForm from "../../components/AddShareForm/AddShareForm";
import { useSharesContext } from "../../hooks/shares";
import { SharesContext } from "../../contexts/shares";
import AddShareRouteHeader from "./AddShareRouteHeader";
import { useCompaniesContext } from "../../hooks/companies";
import { CompaniesContext } from "../../contexts/companies";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const AddShareRoute = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const sharesContext = useSharesContext(companyId);
  const companiesContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <AddShareRouteHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SharesContext.Provider value={sharesContext}>
          <AddShareForm companyId={companyId} />
        </SharesContext.Provider>
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default AddShareRoute;

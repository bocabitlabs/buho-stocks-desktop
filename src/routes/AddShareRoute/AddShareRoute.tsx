import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import AddShareForm from "../../components/AddShareForm/AddShareForm";
import { useSharesContext } from "../../hooks/shares";
import { SharesContext } from "../../contexts/shares";
import AddShareRouteHeader from "./AddShareRouteHeader";
import { useCompanyContext } from "../../hooks/company";
import { CompanyContext } from "../../contexts/company";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const AddShareRoute = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const sharesContext = useSharesContext(companyId);
  const companyContext = useCompanyContext(companyId);

  return (
    <>
      <CompanyContext.Provider value={companyContext}>
        <AddShareRouteHeader companyId={companyId} portfolioId={portfolioId} />
      </CompanyContext.Provider>
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <SharesContext.Provider value={sharesContext}>
          <AddShareForm companyId={companyId} />
        </SharesContext.Provider>
      </Layout>
    </>
  );
};

export default AddShareRoute;

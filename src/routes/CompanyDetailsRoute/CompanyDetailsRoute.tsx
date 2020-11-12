import { Layout } from "antd";
import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { CompanyContext } from "../../contexts/company";
import { useCompanyContext } from "../../hooks/company";
import CompanyDetailsContent from "./CompanyDetailsContent";
import CompanyDetailsRouteHeader from "./CompanyDetailsRouteHeader";

export interface Props {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsRoute(): ReactElement {
  const { portfolioId, companyId } = useParams<Props>();
  const companyContext = useCompanyContext(companyId);

  return (
    <CompanyContext.Provider value={companyContext}>
      <CompanyDetailsRouteHeader
        companyId={companyId}
        portfolioId={portfolioId}
      />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <CompanyDetailsContent companyId={companyId} />
      </Layout>
    </CompanyContext.Provider>
  );
}

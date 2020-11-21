import React from "react";

import { Layout } from "antd";

import { useParams } from "react-router-dom";
import AddShareForm from "../../components/AddShareForm/AddShareForm";
import AddDividendRouteHeader from "./AddDividendRouteHeader";
import { useCompanyContext } from "../../hooks/company";
import { CompanyContext } from "../../contexts/company";
import { useDividendsContext } from "../../hooks/dividends";
import { DividendsContext } from "../../contexts/dividends";
import AddDividendForm from "../../components/AddDividendForm/AddDividendForm";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const AddDividendRoute = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const dividendsContext = useDividendsContext(companyId);
  const companyContext = useCompanyContext(companyId);

  return (
    <CompanyContext.Provider value={companyContext}>
      <AddDividendRouteHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <DividendsContext.Provider value={dividendsContext}>
          <AddDividendForm companyId={companyId} />
        </DividendsContext.Provider>
      </Layout>
    </CompanyContext.Provider>
  );
};

export default AddDividendRoute;

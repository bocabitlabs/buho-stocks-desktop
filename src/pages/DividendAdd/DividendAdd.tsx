import React from "react";
import { Layout } from "antd";
import { useParams } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { DividendsContext } from "contexts/dividends";
import { useDividendsContext } from "hooks/dividends";
import { useCompaniesContext } from "hooks/companies";

import DividendAddHeader from "./components/DividendAddHeader/DividendAddHeader";
import DividendAddForm from "./components/DividendAddForm/DividendAddForm";

export interface Props {
  portfolioId: string;
  companyId: string;
}

const DividendAdd = () => {
  const { portfolioId, companyId } = useParams<Props>();
  const dividendsContext = useDividendsContext(companyId);
  const companyContext = useCompaniesContext(companyId);

  return (
    <CompaniesContext.Provider value={companyContext}>
      <DividendAddHeader companyId={companyId} portfolioId={portfolioId} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <DividendsContext.Provider value={dividendsContext}>
          <DividendAddForm companyId={companyId} />
        </DividendsContext.Provider>
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default DividendAdd;
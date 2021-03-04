import { Button, Tabs, Typography } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { useQuery } from "hooks/use-query";

import ShareListTable from "../ShareListTable/ShareListTable";
import DividendListTable from "../DividendListTable/DividendListTable";
import RightsTransactionsTable from "../RightsTransactionsTable/RightsTransactionsTable";
import Stats from "../Stats/Stats";

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function CompanyDetailsContent({
  companyId,
  portfolioId
}: Props): ReactElement {
  const history = useHistory();
  let query = useQuery();
  const { company, fetchCompany } = useContext(CompaniesContext);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany, portfolioId]);

  return (
    <>
      {company && (
        <>
          <Typography.Paragraph>{company.description}</Typography.Paragraph>
          <Stats company={company} />
          <Tabs
            defaultActiveKey={query.get("tab") || "shares"}
            onChange={() => {
              console.debug("Tab click");
            }}
          >
            <Tabs.TabPane tab="Shares" key="shares">
              <Button
                key={"add-shares-button"}
                type={"primary"}
                onClick={() => {
                  history.push(
                    `/portfolios/${portfolioId}/companies/${company.id}/add-shares`
                  );
                }}
                style={{ marginBottom: 16 }}
              >
                + Shares
              </Button>
              <ShareListTable
                portfolioId={company.portfolioId}
                companyId={companyId}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dividends" key="dividends">
              <Button
                key={"add-dividends-button"}
                type={"primary"}
                onClick={() => {
                  history.push(
                    `/portfolios/${portfolioId}/companies/${company.id}/add-dividends`
                  );
                }}
                style={{ marginBottom: 16 }}
              >
                + Dividends
              </Button>
              <DividendListTable
                portfolioId={company.portfolioId}
                companyId={companyId}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rights" key="rights">
              <Button
                key={"add-rights-button"}
                type={"primary"}
                onClick={() => {
                  history.push(
                    `/portfolios/${portfolioId}/companies/${company.id}/add-rights-transaction`
                  );
                }}
                style={{ marginBottom: 16 }}
              >
                + Rights
              </Button>
              <RightsTransactionsTable
                portfolioId={company.portfolioId}
                companyId={companyId}
              />
            </Tabs.TabPane>
          </Tabs>
        </>
      )}
    </>
  );
}

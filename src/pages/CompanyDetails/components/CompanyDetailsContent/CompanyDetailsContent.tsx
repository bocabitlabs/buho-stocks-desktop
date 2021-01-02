import { Button, Tabs, Typography } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CompaniesContext } from "contexts/companies";
import { DividendsContext } from "contexts/dividends";
import { SharesContext } from "contexts/shares";
import { useDividendsContext } from "hooks/dividends";
import { useSharesContext } from "hooks/shares";
import CompanyDetailsTable from "../CompanyDetailsTable/CompanyDetailsTable";
import ShareListTable from "../ShareListTable/ShareListTable";
import DividendListTable from "../DividendListTable/DividendListTable";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
  const sharesContext = useSharesContext(companyId);
  const dividendsContext = useDividendsContext(companyId);

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany]);

  return (
    <>
      {company && (
        <>
          {/* <Typography.Text type="secondary">
            {company.description}
          </Typography.Text> */}

          <Typography.Paragraph>{company.description}</Typography.Paragraph>

          <CompanyDetailsTable companyId={companyId} />

          <Tabs
            defaultActiveKey={query.get("tab") || "shares"}
            onChange={() => {
              console.log("Tab click");
            }}
            tabBarExtraContent={[
              <Button
                key={"add-shares-button"}
                onClick={() => {
                  history.push(
                    `/portfolios/${portfolioId}/companies/${company?.id}/add-shares`
                  );
                }}
              >
                + Shares
              </Button>,
              <Button
                key={"add-dividends-button"}
                onClick={() => {
                  history.push(
                    `/portfolios/${portfolioId}/companies/${company?.id}/add-dividends`
                  );
                }}
              >
                + Dividends
              </Button>
            ]}
          >
            <Tabs.TabPane tab="Shares" key="shares">
              <SharesContext.Provider value={sharesContext}>
                <ShareListTable
                  portfolioId={company.portfolio}
                  companyId={companyId}
                />
              </SharesContext.Provider>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dividends" key="dividends">
              <DividendsContext.Provider value={dividendsContext}>
                <DividendListTable
                  portfolioId={company.portfolio}
                  companyId={companyId}
                />
              </DividendsContext.Provider>
            </Tabs.TabPane>
          </Tabs>
        </>
      )}
    </>
  );
}

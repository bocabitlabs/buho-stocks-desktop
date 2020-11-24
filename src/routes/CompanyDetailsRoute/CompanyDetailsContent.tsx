import { Tabs, Typography } from "antd";
import React, { ReactElement, useContext } from "react";
import { useLocation } from "react-router-dom";
import CompanyDetailsTable from "../../components/CompanyDetailsTable/CompanyDetailsTable";
import DividendListTable from "../../components/DividendListTable/DividendListTable";
import ShareListTable from "../../components/ShareListTable/ShareListTable";
import { CompanyContext } from "../../contexts/company";
import { DividendsContext } from "../../contexts/dividends";
import { SharesContext } from "../../contexts/shares";
import { useDividendsContext } from "../../hooks/dividends";
import { useSharesContext } from "../../hooks/shares";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Props {
  companyId: string;
}

export default function CompanyDetailsContent({
  companyId
}: Props): ReactElement {
  let query = useQuery();
  const { company } = useContext(CompanyContext);
  const sharesContext = useSharesContext(companyId);
  const dividendsContext = useDividendsContext(companyId);

  return (
    <>
      {company && (
        <>
          <Typography.Text type="secondary">
            {company.description}
          </Typography.Text>

          <CompanyDetailsTable
            companyId={companyId}
          />

          <Tabs
            defaultActiveKey={query.get("tab") || "shares"}
            onChange={() => {
              console.log("Tab click");
            }}
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

import { Button, Tabs, Typography } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { useQuery } from "hooks/use-query";

import CompanyDetailsTable from "../CompanyDetailsTable/CompanyDetailsTable";
import ShareListTable from "../ShareListTable/ShareListTable";
import DividendListTable from "../DividendListTable/DividendListTable";

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
  }, [companyId, fetchCompany]);

  return (
    <>
      {company && (
        <>
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
              <ShareListTable
                portfolioId={company.portfolio}
                companyId={companyId}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dividends" key="dividends">
              <DividendListTable
                portfolioId={company.portfolio}
                companyId={companyId}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Share rights" key="share-rights">
              <DividendListTable
                portfolioId={company.portfolio}
                companyId={companyId}
              />
            </Tabs.TabPane>
          </Tabs>
        </>
      )}
    </>
  );
}

import { Button, Tabs, Typography } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { CompaniesContext } from "contexts/companies";
import { useQueryParameters } from "hooks/query-parameters/use-query-parameters";

import ShareListTable from "../ShareListTable/ShareListTable";
import DividendListTable from "../DividendListTable/DividendListTable";
import RightsTransactionsTable from "../RightsTransactionsTable/RightsTransactionsTable";
import Stats from "../Stats/Stats";
import { useTranslation } from "react-i18next";

interface Props {
  companyId: string;
  portfolioId: string;
}

export default function CompanyDetailsContent({
  companyId,
  portfolioId
}: Props): ReactElement {
  const history = useHistory();
  let query = useQueryParameters();
  const { company, getById: fetchCompany } = useContext(CompaniesContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetchCompany(companyId);
  }, [companyId, fetchCompany, portfolioId]);

  return (
    <>
      {company && (
        <>
          <Typography.Paragraph>
            {t(company.sectorName)} - {t(company.superSectorName)}
          </Typography.Paragraph>
          <Typography.Paragraph>
            {company.description !== "undefined" &&
            company.description !== undefined
              ? company.description
              : ""}
          </Typography.Paragraph>
          <Stats company={company} />
          <Tabs
            defaultActiveKey={query.get("tab") || "shares"}
            onChange={() => {
              console.debug("Tab click");
            }}
          >
            <Tabs.TabPane tab={t("Shares")} key="shares">
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
                {t("+ Shares")}
              </Button>
              <ShareListTable
                portfolioId={company.portfolioId}
                companyId={companyId}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("Dividends")} key="dividends">
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
                {t("+ Dividends")}
              </Button>
              <DividendListTable
                portfolioId={company.portfolioId}
                companyId={companyId}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("Rights")} key="rights">
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
                {t("+ Rights")}
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

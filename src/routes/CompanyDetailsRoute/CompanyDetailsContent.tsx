import { Tabs, Typography } from "antd";
import React, { ReactElement, useContext } from "react";
import ShareListTable from "../../components/ShareListTable/ShareListTable";
import { CompanyContext } from "../../contexts/company";
import { SharesContext } from "../../contexts/shares";
import { useSharesContext } from "../../hooks/shares";

interface Props {
  companyId: string;
}

export default function CompanyDetailsContent({companyId}: Props): ReactElement {
  const { company } = useContext(CompanyContext);
  const sharesContext = useSharesContext(companyId);

  return (
    <>
      <Typography.Text type="secondary">{company?.description}</Typography.Text>
      <Tabs
        defaultActiveKey="1"
        onChange={() => {
          console.log("Tab click");
        }}
      >
        <Tabs.TabPane tab="Shares" key="1">
          <SharesContext.Provider value={sharesContext}>
            <ShareListTable />
          </SharesContext.Provider>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}

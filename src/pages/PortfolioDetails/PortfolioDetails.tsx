import React, { useContext, useEffect, useState } from "react";
import { Layout, Row, Space, Switch } from "antd";

import { useHistory, useParams } from "react-router-dom";
import { useCompaniesContext } from "hooks/companies";
import { CompaniesContext } from "contexts/companies";

import PortfolioDetailsHeader from "./components/PortfolioDetailsHeader/PortfolioDetailsHeader";
import CompanyCardList from "./components/CompanyCardList/CompanyCardList";
import PortfolioStats from "./components/PortfolioStats/PortfolioStats";
import CompanyTableList from "./components/CompanyTableList/CompanyTableList";
import { SettingsContext } from "contexts/settings";

export interface IPortfolioRouteParams {
  id: string;
}

const PortfolioDetails = () => {
  const { id } = useParams<IPortfolioRouteParams>();
  const { settings } = useContext(SettingsContext);
  const {setDefaultCompanyDisplayMode} = useContext(SettingsContext)
  const [displayMode, setDisplayMode] = useState("card")
  const history = useHistory();
  if (id === undefined) {
    history.push(`/`);
  }

  const companiesContext = useCompaniesContext(id);

  const toggle = () => {
    let newValue = "card"
    if(displayMode === "card"){
      newValue = "table"
    }
    setDefaultCompanyDisplayMode(newValue);
  };

  useEffect(() => {
    if(settings !== null){
      const { defaultCompanyDisplayMode } = settings;
      console.log(defaultCompanyDisplayMode)
      setDisplayMode(defaultCompanyDisplayMode);
    }
  }, [settings]);

  return (
    <CompaniesContext.Provider value={companiesContext}>
      <PortfolioDetailsHeader portfolioId={id} />
      <Layout style={{ padding: "0 24px 24px", backgroundColor: "#fff" }}>
        <Space direction="vertical">
          <PortfolioStats />
          <Row>
            <Switch
              checkedChildren="Card view"
              unCheckedChildren="Table view"
              defaultChecked={displayMode === "table"}
              onChange={toggle}
            />
          </Row>
          {(displayMode === "card") ? (
            <CompanyCardList portfolioId={id} />
          ) : (
            <CompanyTableList portfolioId={id} />
          )}
        </Space>
      </Layout>
    </CompaniesContext.Provider>
  );
};

export default PortfolioDetails;

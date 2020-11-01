import { Select } from "antd";
import React, { ReactElement, useContext, useEffect } from "react";
import { PortfoliosContext } from "../../contexts/portfolios";
import { SettingsContext } from "../../contexts/settings";
import { PortfolioFields } from "../../types/portfolio";


export default function PortfolioSelector(): ReactElement {
  const { settings, fetchSettings, updateSelectedPortfolio } = useContext(SettingsContext);
  const { portfolios, fetchPortfolios } = useContext(PortfoliosContext);

  function handleChange(value: string) {
    console.log(`selected ${value}`);

    console.log(settings);
    updateSelectedPortfolio(value);
  }

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);


  return (
    <Select
      placeholder="Portfolios"
      style={{ width: 120 }}
      onChange={handleChange}
      value={settings[0]?.selectedPortfolio.toString()}
    >
      {portfolios.map((item: PortfolioFields) => (
        <Select.Option key={item.id} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}

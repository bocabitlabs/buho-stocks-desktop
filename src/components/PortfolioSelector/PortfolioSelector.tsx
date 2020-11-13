import { Select } from "antd";
import React, { ReactElement, useContext } from "react";
import { PortfoliosContext } from "../../contexts/portfolios";
import { SelectedPortfolioContext } from "../../contexts/selected-portfolio";
import SettingsService from "../../services/settings-service";
import { PortfolioFields } from "../../types/portfolio";

export default function PortfolioSelector(): ReactElement {
  const { selectedPortfolio } = useContext(SelectedPortfolioContext);

  const { portfolios } = useContext(PortfoliosContext);

  function handleChange(value: string) {
    console.log(`selected ${value}`);

    new SettingsService().updateSelectedPortfolio(value);
  }

  console.log(`Portfolios length=${portfolios.length}`);

  return (
    <Select
      placeholder="Portfolios"
      style={{ width: 120 }}
      onChange={handleChange}
      value={selectedPortfolio}
    >
      {portfolios.map((item: PortfolioFields) => (
        <Select.Option key={item.id} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}

import { Select } from "antd";
import React, { ReactElement, useContext } from "react";
import { PortfoliosContext } from "../../contexts/portfolios";
import { SettingsContext } from "../../contexts/settings";
import SettingsService from "../../services/settings-service";
import { PortfolioFields } from "../../types/portfolio";

export default function PortfolioSelector(): ReactElement {
  const { settings } = useContext(
    SettingsContext
  );
  const { portfolios } = useContext(PortfoliosContext);

  function handleChange(value: string) {
    console.log(`selected ${value}`);

    console.log(settings);
    new SettingsService().updateSelectedPortfolio(value);
  }

  console.log(`Portfolios length=${portfolios.length}`)

  // useEffect(() => {
  //   if (portfolios.length === 0) {
  //     updateSelectedPortfolio("");
  //   }
  // }, [updateSelectedPortfolio, portfolios]);

  return (
    <Select
      placeholder="Portfolios"
      style={{ width: 120 }}
      onChange={handleChange}
      value={settings?.selectedPortfolio?.toString()}
    >
      {portfolios.map((item: PortfolioFields) => (
        <Select.Option key={item.id} value={item.id.toString()}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
}

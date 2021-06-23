import { Select } from "antd";
import { Form } from "antd";
import React, { ReactElement, useEffect, useState } from "react";

import PortfolioService from "services/portfolios/portfolios-service";
import { IPortfolio } from "types/portfolio";

import { IBDividendsImport } from "../IB/IBDividendsImport/IBDividendsImport";
import { IBTradesImport } from "../IB/IBTradesImport/IBTradesImport";
import { INGDividendsImport } from "../ING/INGDividendsImport/INGDividendsImport";
import { INGTradesImport } from "../ING/INGTradesImport/INGTradesImport";

export default function CsvImportContent(): ReactElement {
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [transactionType, setTransactionType] = useState("");
  const [selectedBroker, setSelectedBroker] = useState("");
  const brokers = ["Interactive Brokers", "ING"];

  useEffect(() => {
    const portfoliosList = PortfolioService.getAll();
    setPortfolios(portfoliosList);
    setTransactionType("");
  }, []);

  const handlePortfolioChange = (selectedItem: any) => {
    const newPortfolio = PortfolioService.getById(selectedItem);
    setPortfolio(newPortfolio);
    setSelectedBroker("");
    setTransactionType("");
  };

  const handleTypeChange = (selectedItem: any) => {
    setTransactionType(selectedItem);
  };

  const handleBrokerChange = (selectedItem: any) => {
    setSelectedBroker(selectedItem);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Form>
          <Form.Item label="Select the portfolio to import the data:">
            <Select placeholder="Portfolio" onChange={handlePortfolioChange}>
              {portfolios.map((element) => (
                <Select.Option key={element.id} value={element.id}>
                  {element.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {portfolio && (
            <Form.Item label="Select the broker:">
              <Select
                placeholder="Transaction type"
                onChange={handleBrokerChange}
              >
                {brokers.map((element, key) => (
                  <Select.Option key={key} value={element}>
                    {element}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {portfolio && selectedBroker && (
            <Form.Item label="Select the type of the transactions:">
              <Select
                placeholder="Transaction type"
                onChange={handleTypeChange}
              >
                <Select.Option key={"1"} value={"shares"}>
                  Shares
                </Select.Option>
                <Select.Option key={"2"} value={"dividends"}>
                  Dividends
                </Select.Option>
              </Select>
            </Form.Item>
          )}
        </Form>
      </div>

      {transactionType === "shares" &&
        portfolio &&
        selectedBroker === "Interactive Brokers" && (
          <IBTradesImport portfolio={portfolio} />
        )}
      {transactionType === "dividends" &&
        portfolio &&
        selectedBroker === "Interactive Brokers" && (
          <IBDividendsImport portfolio={portfolio} />
        )}
      {transactionType === "shares" &&
        portfolio &&
        selectedBroker === "ING" && <INGTradesImport portfolio={portfolio} />}
      {transactionType === "dividends" &&
        portfolio &&
        selectedBroker === "ING" && (
          <INGDividendsImport portfolio={portfolio} />
        )}
    </div>
  );
}

import { Button, Col, Row, Select, Steps, Typography } from "antd";
import { Form } from "antd";
import React, { ReactElement, useEffect, useState } from "react";

import PortfolioService from "services/portfolios/portfolios-service";
import { IPortfolio } from "types/portfolio";

import { IBDividendsImport } from "../IB/IBDividendsImport/IBDividendsImport";
import { IBTradesImport } from "../IB/IBTradesImport/IBTradesImport";
import { INGDividendsImport } from "../ing-broker-es/dividends-import/dividends-import";
import { INGTradesImport } from "../ing-broker-es/trades-import/trades-import";

const { Step } = Steps;

export default function CsvImportContent(): ReactElement {
  const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
  const [portfolios, setPortfolios] = useState<IPortfolio[]>([]);
  const [transactionType, setTransactionType] = useState("");
  const [selectedBroker, setSelectedBroker] = useState("");
  const [current, setCurrent] = React.useState(0);

  const handlePortfolioChange = (selectedItem: any) => {
    const newPortfolio = PortfolioService.getById(selectedItem);
    setPortfolio(newPortfolio);
    setCurrent(current + 1);
  };

  const handleTypeChange = (selectedItem: any) => {
    setTransactionType(selectedItem);
    // setCurrent(current + 1);
  };

  const steps = [
    {
      title: "Broker",
      description: selectedBroker,
      content: (
        <div>
          <Typography.Text>Select a broker:</Typography.Text>
          <div>
            <img
              alt={"Interactive Brokers logo"}
              width={200}
              src={`/images/interactive-brokers.png`}
              onClick={() => handleBrokerChange("interactive-brokers")}
              style={{ cursor: "pointer" }}
            />
            <img
              alt={"ING logo"}
              width={200}
              src={`/images/ing-logo.png`}
              onClick={() => handleBrokerChange("ing-es")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      )
    },
    {
      title: "Portfolio",
      description: portfolio?.name,
      content: (
        <Form layout="vertical">
          <Form.Item name="selectedPortfolio" label="Select the portfolio to import the data:">
            <Select
              placeholder="Select a Portfolio"
              onChange={handlePortfolioChange}
            >
              {portfolios.map((element) => (
                <Select.Option key={element.id} value={element.id}>
                  {element.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )
    },
    {
      title: "Transaction type",
      description: transactionType,
      content: (
        <Form layout="vertical">
          <Form.Item name="transactionType" label="Select the type of the transactions:">
            <Select placeholder="Transaction type" onChange={handleTypeChange}>
              <Select.Option key={"shares"} value={"shares"}>
                Shares
              </Select.Option>
              <Select.Option key={"dividends"} value={"dividends"}>
                Dividends
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      )
    }
  ];
  const prev = () => {

    switch (current) {
      case 2:
        setTransactionType("")
        break;
      case 1:
        setPortfolio(null);
        break;
      case 0:
        setSelectedBroker("");
        break
      default:
        break;
    }
    setCurrent(current - 1);
  };

  useEffect(() => {
    const portfoliosList = PortfolioService.getAll();
    setPortfolios(portfoliosList);
  }, []);

  const handleBrokerChange = (selectedItem: any) => {
    setSelectedBroker(selectedItem);
    setCurrent(current + 1);
  };

  return (
    <Row>
      <Col span={24}>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>
        <div style={{ marginBottom: 16 }}>
          <div className="steps-content">
            <div style={{ marginTop: 16 }}>{steps[current].content}</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          {current > 0 && (
            <Button onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
        {transactionType === "shares" &&
          portfolio &&
          selectedBroker === "interactive-brokers" && (
            <IBTradesImport portfolio={portfolio} />
          )}
        {transactionType === "dividends" &&
          portfolio &&
          selectedBroker === "interactive-brokers" && (
            <IBDividendsImport portfolio={portfolio} />
          )}
        {transactionType === "shares" &&
          portfolio &&
          selectedBroker === "ing-es" && (
            <INGTradesImport portfolio={portfolio} />
          )}
        {transactionType === "dividends" &&
          portfolio &&
          selectedBroker === "ing-es" && (
            <INGDividendsImport portfolio={portfolio} />
          )}
      </Col>
    </Row>
  );
}

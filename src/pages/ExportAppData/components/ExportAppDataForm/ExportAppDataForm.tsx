import React, { ReactElement } from "react";
import { Button, Checkbox, Form, Typography } from "antd";
import CompanyService from "services/company-service";
import { saveFile } from "message-control/dialog";
import CurrencyService from "services/currency-service";
import SectorService from "services/sector-service";
import MarketService from "services/market-service";
import PortfolioService from "services/portfolio-service";
import InflationService from "services/inflation/inflation-service";
import SharesTransactionsService from "services/shares-transactions-service";
import DividendsTransactionsService from "services/dividends-transactions-service";
import RightsTransactionsService from "services/rights-transactions-service";

export default function ExportAppDataForm(): ReactElement {
  const onFinish = (values: any) => {
    const { checkbox } = values;
    console.log("Exporting...");

    let csvContent = "";
    if (checkbox.includes("sectors")) {
      const sectorsResults = SectorService.exportAll();
      sectorsResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "sector," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("currencies")) {
      const currenciesResults = new CurrencyService().exportAll();
      currenciesResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "currency," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("markets")) {
      const marketsResults = new MarketService().exportAll();
      marketsResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "market," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("inflation")) {
      const inflationsResults = InflationService.exportAll();
      inflationsResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "inflation," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("portfolios")) {
      const portfoliosResults = new PortfolioService().exportAll();
      portfoliosResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "portfolio," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("companies")) {
      const companiesResults = new CompanyService().exportAll();
      companiesResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "company," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("shares")) {
      const sharesResults = SharesTransactionsService.exportAll();
      sharesResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "shares," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("dividends")) {
      const dividendsResults = DividendsTransactionsService.exportAll();
      dividendsResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "dividends," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("rights")) {
      const dividendsResults = RightsTransactionsService.exportAll();
      dividendsResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "rights," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    console.log(csvContent);
    saveFile(csvContent);
  };

  return (
    <Form onFinish={onFinish}>
      <Typography.Text>
        Select below all the elements that you want to export. All the elements
        of that type will be included on the export CSV file.
      </Typography.Text>
      <Form.Item name="checkbox" label="Elements to export">
        <Checkbox.Group>
          <Checkbox value="portfolios" style={{ lineHeight: "32px" }}>
            Portfolios
          </Checkbox>
          <Checkbox value="companies" style={{ lineHeight: "32px" }}>
            Companies
          </Checkbox>
          <Checkbox value="shares" style={{ lineHeight: "32px" }}>
            Shares
          </Checkbox>
          <Checkbox value="dividends" style={{ lineHeight: "32px" }}>
            Dividends
          </Checkbox>
          <Checkbox value="rights" style={{ lineHeight: "32px" }}>
            Rights
          </Checkbox>
          <Checkbox value="sectors" style={{ lineHeight: "32px" }}>
            Sectors
          </Checkbox>
          <Checkbox value="currencies" style={{ lineHeight: "32px" }}>
            Currencies
          </Checkbox>
          <Checkbox value="markets" style={{ lineHeight: "32px" }}>
            Markets
          </Checkbox>
          <Checkbox value="inflation" style={{ lineHeight: "32px" }}>
            Inflation
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Export
        </Button>
      </Form.Item>
    </Form>
  );
}

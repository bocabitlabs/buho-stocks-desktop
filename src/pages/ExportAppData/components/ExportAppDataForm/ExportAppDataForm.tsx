import React, { ReactElement } from "react";
import { Button, Checkbox, Form, Typography } from "antd";
import CompanyService from "services/company-service/company-service";
import { saveFile } from "message-control/dialog";
import CurrencyService from "services/currency-service/currency-service";
import SectorService from "services/sector-service/sector-service";
import MarketService from "services/market-service/market-service";
import PortfolioService from "services/portfolio-service";
import SharesTransactionsService from "services/shares-transactions-service";
import DividendsTransactionsService from "services/dividends-transactions-service";
import RightsTransactionsService from "services/rights-transactions-service";
import StockPriceService from "services/stock-price-service/stock-price-service";

export default function ExportAppDataForm(): ReactElement {
  const onFinish = (values: any) => {
    const { checkbox } = values;
    console.debug("Exporting...");

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
      const currenciesResults = CurrencyService.exportAll();
      currenciesResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "currency," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    if (checkbox.includes("markets")) {
      const marketsResults = MarketService.exportAll();
      marketsResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "market," + keys.join(",");
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
      const companiesResults = CompanyService.exportAll();
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
    if (checkbox.includes("stockPrices")) {
      const dividendsResults = StockPriceService.exportAll();
      dividendsResults.forEach(function (rowArray) {
        const keys = Object.values(rowArray);
        let row = "stockPrice," + keys.join(",");
        csvContent += row + "\r\n";
      });
    }
    console.debug(csvContent);
    saveFile(csvContent);
  };

  const options = [
    { label: "Companies", value: "companies" },
    { label: "Currencies", value: "currencies" },
    { label: "Dividends", value: "dividends" },
    { label: "Markets", value: "markets" },
    { label: "Portfolios", value: "portfolios" },
    { label: "Rights", value: "rights" },
    { label: "Sectors", value: "sectors" },
    { label: "Shares", value: "shares" },
    { label: "Stock Prices", value: "stockPrices" }
  ];

  return (
    <Form onFinish={onFinish}>
      <Typography.Text>
        Select below all the elements that you want to export. All the elements
        of that type will be included on the export CSV file.
      </Typography.Text>
      <Form.Item name="checkbox" label="Elements to export">
        <Checkbox.Group options={options} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Export
        </Button>
      </Form.Item>
    </Form>
  );
}

import React, { ReactElement } from "react";
import { Button, Checkbox, Form, Typography } from "antd";
import CompanyService from "services/companies/companies-service";
import { saveFile } from "message-control/dialog";
import CurrencyService from "services/currencies/currencies-service";
import SectorsService from "services/sectors/sectors-service";
import MarketService from "services/markets/markets-service";
import PortfolioService from "services/portfolios/portfolios-service";
import SharesTransactionsService from "services/shares-transactions/shares-transactions-service";
import DividendsTransactionsService from "services/dividends-transactions/dividends-transactions-service";
import RightsTransactionsService from "services/rights-transactions/rights-transactions-service";
import StockPriceService from "services/stock-prices/stock-prices-service";
import { useTranslation } from "react-i18next";

export default function ExportAppDataForm(): ReactElement {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    const { checkbox } = values;
    console.debug("Exporting...");

    let csvContent = "";
    if (checkbox.includes("sectors")) {
      const sectorsResults = SectorsService.exportAll();
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
      const portfoliosResults = PortfolioService.exportAll();
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
    { label: t("Companies"), value: "companies" },
    { label: t("Currencies"), value: "currencies" },
    { label: t("Dividends"), value: "dividends" },
    { label: t("Markets"), value: "markets" },
    { label: t("Portfolios"), value: "portfolios" },
    { label: t("Rights"), value: "rights" },
    { label: t("Sectors"), value: "sectors" },
    { label: t("Shares"), value: "shares" },
    { label: t("Stock Prices"), value: "stockPrices" }
  ];

  return (
    <Form onFinish={onFinish}>
      <Typography.Text>
        {t(`Select below all the elements that you want to export. All the elements of that type will be included on the export CSV file.`)}
      </Typography.Text>
      <Form.Item name="checkbox" label={t("Elements to export")}>
        <Checkbox.Group options={options} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("Export")}
        </Button>
      </Form.Item>
    </Form>
  );
}

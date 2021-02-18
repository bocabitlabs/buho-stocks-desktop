import { Button, Checkbox, Form, Space, Typography } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import CurrencyService from "services/currency-service";
import MarketService from "services/market-service";
import PortfolioService from "services/portfolio-service";
import SectorService from "services/sector-service";
import { CurrencyFormFields } from "types/currency";
import { MarketFormProps } from "types/market";
import { PortfolioFormFields } from "types/portfolio";
import { SectorFormFields } from "types/sector";
import PortfolioImporter from "../PortfolioImporter/PortfolioImporter";

export default function CsvAppImporter(): ReactElement {
  const [data, setData] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [sectorsCount, setSectorsCount] = useState(0);

  const [markets, setMarkets] = useState([]);
  const [marketsCount, setMarketsCount] = useState(0);

  const [currencies, setCurrencies] = useState([]);
  const [currenciesCount, setCurrenciesCount] = useState(0);

  const [portfolios, setPortfolios] = useState([]);
  const [portfoliosCount, setPortfoliosCount] = useState(0);
  const [importingPortfolios, setImportingPortfolios] = useState(false);

  useEffect(() => {}, []);

  const handleOnFileLoad = (data: any) => {
    console.log(data);
    const filteredSectors = data.filter((element: any) => {
      return element.data[0] === "sector";
    });
    const filteredMarkets = data.filter((element: any) => {
      return element.data[0] === "market";
    });
    const filteredCurrencies = data.filter((element: any) => {
      return element.data[0] === "currency";
    });
    const filteredPortfolios = data.filter((element: any) => {
      return element.data[0] === "portfolio";
    });
    setSectors(filteredSectors);
    setSectorsCount(filteredSectors.length);
    setMarkets(filteredMarkets);
    setMarketsCount(filteredMarkets.length);

    setCurrencies(filteredCurrencies);
    setCurrenciesCount(filteredCurrencies.length);

    setPortfolios(filteredPortfolios);
    setPortfoliosCount(filteredPortfolios.length);

    setData(data);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const onFinish = (values: any) => {
    const { checkbox } = values;
    console.log("Importing...");
    if (checkbox.includes("sectors")) {
      importSectors();
    }
    if (checkbox.includes("markets")) {
      importMarkets();
    }
    if (checkbox.includes("currencies")) {
      importCurrencies();
    }
    if (checkbox.includes("portfolios")) {
      importPortfolios();
    }
  };

  return (
    <Space direction="vertical">
      <CSVReader onDrop={handleOnFileLoad} onError={handleOnError} noDrag>
        <span>Click to upload.</span>
      </CSVReader>
      {data && data.length > 0 && (
        <Space direction="vertical">
          <p>
            Found:
            <ol>
              <li>{sectorsCount} sectors.</li>
              <li>{marketsCount} markets.</li>
              <li>{currenciesCount} currencies.</li>
              <li>{portfoliosCount} portfolios.</li>
            </ol>
          </p>
          <Form onFinish={onFinish}>
            <Typography.Text>
              Select below all the elements that you want to import. All the
              elements of that type will be added{" "}
              <strong>if they don't exist</strong>.
            </Typography.Text>
            <Form.Item name="checkbox" label="Elements to import">
              <Checkbox.Group>
                <Checkbox
                  value="sectors"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Sectors
                </Checkbox>
                <Checkbox
                  value="currencies"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Currencies
                </Checkbox>
                <Checkbox
                  value="markets"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Markets
                </Checkbox>
                <Checkbox
                  value="portfolios"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Portfolios
                </Checkbox>
                <Checkbox
                  value="companies"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Companies
                </Checkbox>
                <Checkbox
                  value="shares"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Shares
                </Checkbox>
                <Checkbox
                  value="dividends"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Dividends
                </Checkbox>
                <Checkbox
                  value="rights"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Rights
                </Checkbox>
                <Checkbox
                  value="inflation"
                  style={{ lineHeight: "32px" }}
                  disabled={importingPortfolios}
                >
                  Inflation
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={importingPortfolios}
              >
                Start import
              </Button>
            </Form.Item>
          </Form>
          {importingPortfolios && <PortfolioImporter portfolios={portfolios}/>}
        </Space>
      )}
    </Space>
  );

  function importSectors() {
    let importedCount = 0;
    sectors.forEach((sectorData: any) => {
      const sector: SectorFormFields = {
        name: sectorData.data[2],
        color: sectorData.data[3]
      };
      const exists = SectorService.getByName(sector.name);
      if (exists === undefined) {
        SectorService.addSector(sector);
        importedCount++;
      }
    });
    console.log(`Imported ${importedCount} sectors`);
  }

  function importMarkets() {
    let importedCount = 0;
    markets.forEach((marketData: any) => {
      const market: MarketFormProps = {
        name: marketData.data[2],
        description: marketData.data[3],
        color: marketData.data[4],
        region: marketData.data[5],
        openTime: marketData.data[6],
        closeTime: marketData.data[7]
      };
      const exists = MarketService.getByName(market.name);
      if (exists === undefined) {
        MarketService.addMarket(market);
        importedCount++;
      }
    });
    console.log(`Imported ${importedCount} markets`);
  }

  function importCurrencies() {
    let importedCount = 0;
    currencies.forEach((currencyData: any) => {
      const currency: CurrencyFormFields = {
        abbreviation: currencyData.data[2],
        name: currencyData.data[3],
        color: currencyData.data[4],
        symbol: currencyData.data[5],
        country: currencyData.data[6]
      };
      console.log(currencyData);
      const exists = CurrencyService.getByName(currency.name);
      if (exists === undefined) {
        CurrencyService.addCurrency(currency);
        importedCount++;
      }
    });
    console.log(`Imported ${importedCount} currencies`);
  }
  function importPortfolios() {
    let importedCount = 0;
    if (portfoliosCount > 0) {
      setImportingPortfolios(true);
    }
    portfolios.forEach((portfolioData: any) => {
      // const portfolio: PortfolioFormFields = {
      //   name: portfolioData.data[2],
      //   color: portfolioData.data[3],
      //   description: portfolioData.data[4]
      // };
      console.log(portfolioData);
      // const exists = PortfolioService.getByName(currency.name);
      // if (exists === undefined) {
      //   CurrencyService.addCurrency(currency);
      //   importedCount++;
      // }
    });
    console.log(`Imported ${importedCount} currencies`);
  }
}

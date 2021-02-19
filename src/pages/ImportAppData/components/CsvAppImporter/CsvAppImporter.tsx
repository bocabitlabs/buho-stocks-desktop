import { Button, Checkbox, Form, Space, Steps, Typography } from "antd";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { CSVReader } from "react-papaparse";
import CompanyService from "services/company-service";
import CurrencyService from "services/currency-service";
import DividendsTransactionsService from "services/dividends-transactions-service";
import InflationService from "services/inflation/inflation-service";
import MarketService from "services/market-service";
import PortfolioService from "services/portfolio-service";
import RightsTransactionsService from "services/rights-transactions-service";
import SectorService from "services/sector-service";
import SharesTransactionsService from "services/shares-transactions-service";
import { CompanyFormFields } from "types/company";
import { CurrencyFormFields } from "types/currency";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import { InflationFormFields } from "types/inflation";
import { MarketFormProps } from "types/market";
import { PortfolioFormFields } from "types/portfolio";
import { RightsTransactionFormProps } from "types/rights-transaction";
import { SectorFormFields } from "types/sector";
import { SharesTransactionFormProps } from "types/shares-transaction";
import ProgressSteps from "../ProgressSteps/ProgressSteps";

export default function CsvAppImporter(): ReactElement {
  const [data, setData] = useState([]);
  const [importStarted, setImportStarted] = useState(false);
  const [importStep, setImportStep] = useState(0);

  const [sectors, setSectors] = useState([]);
  const [sectorsCount, setSectorsCount] = useState(0);

  const [markets, setMarkets] = useState([]);
  const [marketsCount, setMarketsCount] = useState(0);

  const [currencies, setCurrencies] = useState([]);
  const [currenciesCount, setCurrenciesCount] = useState(0);

  const [portfolios, setPortfolios] = useState([]);
  const [portfoliosCount, setPortfoliosCount] = useState(0);

  const [companies, setCompanies] = useState([]);
  const [companiesCount, setCompaniesCount] = useState(0);

  const [shares, setShares] = useState([]);
  const [sharesCount, setSharesCount] = useState(0);

  const [rights, setRights] = useState([]);
  const [rightsCount, setRightsCount] = useState(0);

  const [dividends, setDividends] = useState([]);
  const [dividendsCount, setDividendsCount] = useState(0);

  const [inflations, setInflations] = useState([]);
  const [inflationsCount, setInflationsCount] = useState(0);

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
    const filteredCompanies = data.filter((element: any) => {
      return element.data[0] === "company";
    });
    const filteredShares = data.filter((element: any) => {
      return element.data[0] === "shares";
    });
    const filteredRights = data.filter((element: any) => {
      return element.data[0] === "rights";
    });
    const filteredDividends = data.filter((element: any) => {
      return element.data[0] === "dividends";
    });
    const filteredInflations = data.filter((element: any) => {
      return element.data[0] === "inflation";
    });
    setSectors(filteredSectors);
    setSectorsCount(filteredSectors.length);
    setMarkets(filteredMarkets);
    setMarketsCount(filteredMarkets.length);

    setCurrencies(filteredCurrencies);
    setCurrenciesCount(filteredCurrencies.length);

    setPortfolios(filteredPortfolios);
    setPortfoliosCount(filteredPortfolios.length);

    setCompanies(filteredCompanies);
    setCompaniesCount(filteredCompanies.length);

    setShares(filteredShares);
    setSharesCount(filteredShares.length);

    setRights(filteredRights);
    setRightsCount(filteredRights.length);

    setDividends(filteredDividends);
    setDividendsCount(filteredDividends.length);

    setInflations(filteredInflations);
    setInflationsCount(filteredInflations.length);

    setData(data);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const onFinish = (values: any) => {
    const { checkbox } = values;
    setImportStarted(true);
    console.log("Importing...");
    setImportStep(0);
    if (checkbox.includes("sectors")) {
      const {importedCount, totalCount} = importSectors();
    }
    setImportStep(1);
    if (checkbox.includes("markets")) {
      importMarkets();
    }
    setImportStep(2);
    if (checkbox.includes("currencies")) {
      importCurrencies();
    }
    setImportStep(3);
    if (checkbox.includes("portfolios")) {
      importPortfolios();
    }
    setImportStep(4);
    if (checkbox.includes("companies")) {
      importCompanies();
    }
    setImportStep(5);
    if (checkbox.includes("shares")) {
      importSharesTransactions();
    }
    setImportStep(6);
    if (checkbox.includes("rights")) {
      importRightsTransactions();
    }
    setImportStep(7);
    if (checkbox.includes("dividends")) {
      importDividendsTransactions();
    }
    setImportStep(8);
    if (checkbox.includes("inflations")) {
      importInflations();
    }
    setImportStep(9);
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
              <ul>
                <li>{sectorsCount} sectors.</li>
                <li>{marketsCount} markets.</li>
                <li>{currenciesCount} currencies.</li>
                <li>{portfoliosCount} portfolios.</li>
                <li>{companiesCount} companies.</li>
                <li>{sharesCount} shares transactions.</li>
                <li>{rightsCount} rights transactions.</li>
                <li>{dividendsCount} dividends transactions.</li>
                <li>{inflationsCount} inflations.</li>
              </ul>
            </p>
            {!importStarted && (
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
                      disabled={importStarted}
                    >
                      Sectors
                    </Checkbox>
                    <Checkbox
                      value="currencies"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Currencies
                    </Checkbox>
                    <Checkbox
                      value="markets"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Markets
                    </Checkbox>
                    <Checkbox
                      value="portfolios"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Portfolios
                    </Checkbox>
                    <Checkbox
                      value="companies"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Companies
                    </Checkbox>
                    <Checkbox
                      value="shares"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Shares
                    </Checkbox>
                    <Checkbox
                      value="dividends"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Dividends
                    </Checkbox>
                    <Checkbox
                      value="rights"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Rights
                    </Checkbox>
                    <Checkbox
                      value="inflation"
                      style={{ lineHeight: "32px" }}
                      disabled={importStarted}
                    >
                      Inflation
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={importStarted}
                  >
                    Start import
                  </Button>
                </Form.Item>
              </Form>
            )}
            {importStarted && (
              <ProgressSteps importStep={importStep}/>
            )}
          </Space>
        )}
      </Space>
  );

  function importSectors() {
    let importedCount = 0;
    let totalCount = 0;
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
      totalCount++;
    });
    console.log(`Imported ${importedCount} sectors`);
    return {importedCount, totalCount}
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

    portfolios.forEach((portfolioData: any) => {
      const exists = PortfolioService.getByName(portfolioData.data[1]);
      if (exists === undefined) {
        const currency = CurrencyService.getByName(portfolioData.data[6]);
        if (currency !== undefined) {
          console.log(portfolioData);
          const portfolio: PortfolioFormFields = {
            name: portfolioData.data[1],
            color: portfolioData.data[2],
            description: portfolioData.data[3],
            currencyId: currency.id
          };
          PortfolioService.create(portfolio);
          importedCount++;
        }
      }
    });
    console.log(`Imported ${importedCount} portfolios`);
  }

  function importCompanies() {
    let importedCount = 0;
    companies.forEach((portfolioData: any) => {
      const exists = CompanyService.getByTicker(portfolioData.data[3]);
      if (exists === undefined) {
        const currency = CurrencyService.getByName(portfolioData.data[9]);
        const sector = SectorService.getByName(portfolioData.data[8]);
        const market = MarketService.getByName(portfolioData.data[6]);
        const portfolio = PortfolioService.getByName(portfolioData.data[11]);

        if (currency && sector && market && portfolio) {
          console.log(portfolioData);
          const company: CompanyFormFields = {
            name: portfolioData.data[1],
            color: portfolioData.data[2],
            ticker: portfolioData.data[3],
            description: portfolioData.data[4],
            broker: portfolioData.data[5],
            url: portfolioData.data[6],
            closed: portfolioData.data[7],
            currency: currency.id,
            market: market.id,
            sector: sector.id,
            portfolioId: portfolio.id
          };
          new CompanyService().addCompany(company);
          importedCount++;
        }
      }
    });
    console.log(`Imported ${importedCount} companies`);
  }

  function importSharesTransactions() {
    let importedCount = 0;
    shares.forEach((portfolioData: any) => {
      const portfolio = PortfolioService.getByName(portfolioData.data[13]);
      if (portfolio) {
        const company = CompanyService.getByTickerPortfolio(
          portfolioData.data[12],
          portfolio.id
        );
        if (company) {
          const transaction: SharesTransactionFormProps = {
            count: portfolioData.data[1],
            price: portfolioData.data[2],
            commission: portfolioData.data[3],
            color: portfolioData.data[4],
            transactionDate: portfolioData.data[5],
            exchangeRate: portfolioData.data[6],
            notes: portfolioData.data[7],
            type: portfolioData.data[8],
            companyId: company.id
          };
          SharesTransactionsService.create(transaction);
          importedCount++;
        }
      }
    });
    console.log(`Imported ${importedCount} shares transactions`);
  }

  function importRightsTransactions() {
    let importedCount = 0;
    rights.forEach((portfolioData: any) => {
      const portfolio = PortfolioService.getByName(portfolioData.data[13]);
      if (portfolio) {
        const company = CompanyService.getByTickerPortfolio(
          portfolioData.data[12],
          portfolio.id
        );
        if (company) {
          const transaction: RightsTransactionFormProps = {
            count: portfolioData.data[1],
            price: portfolioData.data[2],
            commission: portfolioData.data[3],
            color: portfolioData.data[4],
            transactionDate: portfolioData.data[5],
            exchangeRate: portfolioData.data[6],
            notes: portfolioData.data[7],
            type: portfolioData.data[8],
            companyId: company.id
          };
          RightsTransactionsService.create(transaction);
          importedCount++;
        }
      }
    });
    console.log(`Imported ${importedCount} rights transactions`);
  }

  function importDividendsTransactions() {
    let importedCount = 0;
    dividends.forEach((portfolioData: any) => {
      const portfolio = PortfolioService.getByName(portfolioData.data[13]);
      if (portfolio) {
        const company = CompanyService.getByTickerPortfolio(
          portfolioData.data[12],
          portfolio.id
        );
        if (company) {
          const transaction: DividendsTransactionFormProps = {
            count: portfolioData.data[1],
            price: portfolioData.data[2],
            commission: portfolioData.data[3],
            transactionDate: portfolioData.data[4],
            exchangeRate: portfolioData.data[5],
            color: portfolioData.data[6],
            notes: portfolioData.data[7],
            companyId: company.id
          };
          DividendsTransactionsService.create(transaction);
          importedCount++;
        }
      }
    });
    console.log(`Imported ${importedCount} dividends transactions`);
  }

  function importInflations() {
    let importedCount = 0;
    inflations.forEach((inflationData: any) => {
      const inflation: InflationFormFields = {
        year: inflationData.data[1],
        percentage: inflationData.data[2]
      };
      const exists = InflationService.getByYear(inflation.year);
      if (exists === undefined) {
        InflationService.add(inflation);
        importedCount++;
      }
    });
    console.log(`Imported ${importedCount} inflations`);
  }
}

import { Space, Input, Form, Collapse, Row, Col } from "antd";
import React, { ReactElement, useState } from "react";
import { CSVReader } from "react-papaparse";
import CsvAppImporterForm from "../CsvAppImporterForm/CsvAppImporterForm";
import FoundItems from "../FoundItems/FoundItems";
import { ImportIds } from "../import-ids";
import ProgressSteps from "../ProgressSteps/ProgressSteps";
import {
  importCompanies,
  importCurrencies,
  importDividendsTransactions,
  importInflations,
  importMarkets,
  importPortfolios,
  importRightsTransactions,
  importSectors,
  importSharesTransactions,
  importStockPrices
} from "./utils";

export default function CsvAppImporter(): ReactElement {
  const [imported, setImported] = useState(false);
  const [stepsNames, setStepsNames] = useState<string[]>([]);

  const [importStarted, setImportStarted] = useState(false);
  const [importStep, setImportStep] = useState(0);
  const [importNotes, setImportNotes] = useState<string[]>([]);
  const [importStepText, setImportStepText] = useState("");

  const [sectors, setSectors] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [shares, setShares] = useState([]);
  const [rights, setRights] = useState([]);
  const [dividends, setDividends] = useState([]);
  const [inflations, setInflations] = useState([]);
  const [stockPrices, setStockPrices] = useState([]);

  const handleOnFileLoad = (data: any) => {
    console.log(data);
    const filteredSectors = data.filter((element: any) => {
      return element.data[0] === "sector";
    });
    setSectors(filteredSectors);

    const filteredMarkets = data.filter((element: any) => {
      return element.data[0] === "market";
    });
    setMarkets(filteredMarkets);

    const filteredCurrencies = data.filter((element: any) => {
      return element.data[0] === "currency";
    });
    setCurrencies(filteredCurrencies);

    const filteredPortfolios = data.filter((element: any) => {
      return element.data[0] === "portfolio";
    });
    setPortfolios(filteredPortfolios);

    const filteredCompanies = data.filter((element: any) => {
      return element.data[0] === "company";
    });
    setCompanies(filteredCompanies);

    const filteredShares = data.filter((element: any) => {
      return element.data[0] === "shares";
    });
    setShares(filteredShares);

    const filteredRights = data.filter((element: any) => {
      return element.data[0] === "rights";
    });
    setRights(filteredRights);

    const filteredDividends = data.filter((element: any) => {
      return element.data[0] === "dividends";
    });
    setDividends(filteredDividends);

    const filteredInflations = data.filter((element: any) => {
      return element.data[0] === "inflation";
    });
    setInflations(filteredInflations);

    const filteredStockPrices = data.filter((element: any) => {
      return element.data[0] === "stockPrice";
    });
    setStockPrices(filteredStockPrices);
    setImported(true);
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const onFinish = (values: any) => {
    const { checkbox } = values;
    let newNotes: string[] = [];
    let tempSteps: string[] = [];
    checkbox.forEach((element: any) => {
      tempSteps.push(element);
    });
    setStepsNames(tempSteps);

    setImportStarted(true);
    console.log("Importing...");
    if (checkbox.includes("sectors")) {
      setImportStep(ImportIds.sectors);
      const { importedCount, totalCount, notes } = importSectors(sectors);
      newNotes = [...newNotes, ...notes];
      setImportStepText(`Imported ${importedCount}/${totalCount} sectors`);
    }
    if (checkbox.includes("markets")) {
      setImportStep(ImportIds.markets);
      const { importedCount, totalCount, notes } = importMarkets(markets);
      newNotes = [...newNotes, ...notes];
      setImportStepText(`Imported ${importedCount}/${totalCount} markets`);
    }
    if (checkbox.includes("currencies")) {
      setImportStep(ImportIds.currencies);
      const { importedCount, totalCount, notes } = importCurrencies(currencies);
      newNotes = [...newNotes, ...notes];
      setImportStepText(`Imported ${importedCount}/${totalCount} currencies`);
    }
    if (checkbox.includes("portfolios")) {
      setImportStep(ImportIds.portfolios);
      const { importedCount, totalCount, notes } = importPortfolios(portfolios);
      newNotes = [...newNotes, ...notes];
      setImportStepText(`Imported ${importedCount}/${totalCount} portfolios`);
    }
    if (checkbox.includes("companies")) {
      setImportStep(ImportIds.companies);
      const { importedCount, totalCount, notes } = importCompanies(companies);
      newNotes = [...newNotes, ...notes];
      setImportStepText(`Imported ${importedCount}/${totalCount} companies`);
    }
    if (checkbox.includes("shares")) {
      setImportStep(ImportIds.shares);
      const { importedCount, totalCount, notes } = importSharesTransactions(
        shares
      );
      newNotes = [...newNotes, ...notes];

      setImportStepText(
        `Imported ${importedCount}/${totalCount} shares transactions`
      );
    }
    if (checkbox.includes("rights")) {
      setImportStep(ImportIds.rights);
      const { importedCount, totalCount, notes } = importRightsTransactions(
        rights
      );
      newNotes = [...newNotes, ...notes];

      setImportStepText(
        `Imported ${importedCount}/${totalCount} rights transactions`
      );
    }
    if (checkbox.includes("dividends")) {
      setImportStep(ImportIds.dividends);
      const { importedCount, totalCount, notes } = importDividendsTransactions(
        dividends
      );
      newNotes = [...newNotes, ...notes];
      setImportStepText(
        `Imported ${importedCount}/${totalCount} dividends transactions`
      );
    }
    if (checkbox.includes("inflations")) {
      setImportStep(ImportIds.inflations);
      const { importedCount, totalCount, notes } = importInflations(inflations);
      newNotes = [...newNotes, ...notes];
      setImportStepText(`Imported ${importedCount}/${totalCount} inflations`);
    }
    if (checkbox.includes("stockPrices")) {
      setImportStep(ImportIds.stockPrices);
      const { importedCount, totalCount, notes } = importStockPrices(
        stockPrices
      );
      newNotes = [...newNotes, ...notes];
      setImportStepText(`Imported ${importedCount}/${totalCount} stock prices`);
    }
    setImportNotes(newNotes);
    setImportStep(11);
  };

  return (
    <div style={{ width: "100%" }}>
      <Row gutter={[16, 32]}>
        <Col span={24}>
          <CSVReader onDrop={handleOnFileLoad} onError={handleOnError} noDrag>
            <span>Click to upload.</span>
          </CSVReader>
        </Col>
      </Row>
      {imported && (
        <div style={{ width: "100%" }}>
          <Row gutter={[16, 32]}>
            <Col span={12}>
              <FoundItems
                elementsFound={{
                  sectorsCount: sectors.length,
                  marketsCount: markets.length,
                  currenciesCount: currencies.length,
                  portfoliosCount: portfolios.length,
                  companiesCount: companies.length,
                  sharesCount: shares.length,
                  rightsCount: rights.length,
                  dividendsCount: dividends.length,
                  inflationsCount: inflations.length,
                  stockPricesCount: stockPrices.length
                }}
              />
            </Col>
            <Col span={12}>
              {importStarted ? (
                <ProgressSteps
                  importStep={importStep}
                  importText={importStepText}
                  stepsNames={stepsNames}
                />
              ) : (
                <CsvAppImporterForm
                  onFinish={onFinish}
                  importStarted={importStarted}
                />
              )}
            </Col>
          </Row>
          {importStarted && (
            <Row>
              <Col span={24}>
                <Collapse>
                  <Collapse.Panel
                    header="View import notes"
                    key="1"
                    style={{ width: "100%" }}
                  >
                    <ol>
                      {importNotes.map((note) => (
                        <li>{note}</li>
                      ))}
                    </ol>
                  </Collapse.Panel>
                </Collapse>
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  );
}

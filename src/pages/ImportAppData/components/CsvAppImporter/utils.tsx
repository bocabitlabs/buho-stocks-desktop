import CompanyService from "services/company-service";
import CurrencyService from "services/currency-service";
import DividendsTransactionsService from "services/dividends-transactions-service";
import InflationService from "services/inflation/inflation-service";
import MarketService from "services/market-service";
import PortfolioService from "services/portfolio-service";
import RightsTransactionsService from "services/rights-transactions-service";
import SectorService from "services/sector-service";
import SharesTransactionsService from "services/shares-transactions-service";
import StockPriceService from "services/stock-price-service";
import { CompanyFormFields } from "types/company";
import { CurrencyFormFields } from "types/currency";
import { DividendsTransactionFormProps } from "types/dividends-transaction";
import { InflationFormFields } from "types/inflation";
import { MarketFormProps } from "types/market";
import { PortfolioFormFields } from "types/portfolio";
import { RightsTransactionFormProps } from "types/rights-transaction";
import { SectorFormFields } from "types/sector";
import { SharesTransactionFormProps } from "types/shares-transaction";
import { StockPriceFormProps } from "types/stock-price";

export function importSectors(sectors: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];
  sectors.forEach((sectorData: any) => {
    const sector: SectorFormFields = {
      name: sectorData.data[1],
      color: sectorData.data[2]
    };
    const exists = SectorService.getByName(sector.name);
    if (exists === undefined) {
      SectorService.addSector(sector);
      importedCount++;
    } else {
      notes.push(`Sectors: Sector ${sector.name} already exists. Skipping.`);
    }
    totalCount++;
  });
  console.log(`Imported ${importedCount} sectors`);
  return { importedCount, totalCount, notes };
}

export function importMarkets(markets: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

  markets.forEach((marketData: any) => {
    const market: MarketFormProps = {
      name: marketData.data[1],
      color: marketData.data[2],
      region: marketData.data[3],
      description: marketData.data[4],
      openTime: marketData.data[5],
      closeTime: marketData.data[6]
    };
    const exists = MarketService.getByName(market.name);
    if (exists === undefined) {
      MarketService.addMarket(market);
      importedCount++;
    } else {
      notes.push(`Markets: Market ${market.name} already exists. Skipping.`);
    }
    totalCount++;
  });
  console.log(`Imported ${importedCount} markets`);
  return { importedCount, totalCount, notes };
}

export function importCurrencies(currencies: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

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
    } else {
      notes.push(
        `Currencies: Currency ${currency.name} already exists. Skipping.`
      );
    }
    totalCount++;
  });
  console.log(`Imported ${importedCount} currencies`);
  return { importedCount, totalCount, notes };
}
export function importPortfolios(portfolios: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

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
      } else {
        notes.push(
          `Portfolios: Currency ${portfolioData.data[6]} doesn't exist. Add it first. Skipping.`
        );
      }
      totalCount++;
    } else {
      notes.push(
        `Portfolios: Portfolio ${portfolioData.data[1]} already exists. Skipping.`
      );
    }
  });
  console.log(`Imported ${importedCount} portfolios`);
  return { importedCount, totalCount, notes };
}

export function importCompanies(companies: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

  companies.forEach((portfolioData: any) => {
    const exists = CompanyService.getByTicker(portfolioData.data[3]);
    if (exists === undefined) {
      const sector = SectorService.getByName(portfolioData.data[8]);
      const currency = CurrencyService.getByName(portfolioData.data[9]);
      const portfolio = PortfolioService.getByName(portfolioData.data[11]);
      const market = MarketService.getByName(portfolioData.data[12]);

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
          currencyId: currency.id,
          marketId: market.id,
          sectorId: sector.id,
          portfolioId: portfolio.id,
          alternativeTickers: portfolioData.data[13]
        };
        new CompanyService().addCompany(company);
        importedCount++;
      } else {
        notes.push(
          `Companies: Either currency, sector, market or portfolio don't exist for company ${portfolioData.data[1]}. Add them first. Skipping.`
        );
      }
      totalCount++;
    } else {
      notes.push(
        `Companies: Company ${portfolioData.data[1]} already exists. Skipping.`
      );
    }
  });
  console.log(`Imported ${importedCount} companies`);
  return { importedCount, totalCount, notes };
}

export function importSharesTransactions(shares: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

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
      } else {
        notes.push(
          `Shares transactions: Company ${portfolioData.data[12]} doesn't exist. Add it first. Skipping.`
        );
      }
      totalCount++;
    } else {
      notes.push(
        `Shares transactions: Portfolio ${portfolioData.data[13]} doesn't exist. Add it first. Skipping.`
      );
    }
  });
  console.log(`Imported ${importedCount} shares transactions`);
  return { importedCount, totalCount, notes };
}

export function importRightsTransactions(rights: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

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
      } else {
        notes.push(
          `Rights transactions: Company ${portfolioData.data[12]} doesn't exist. Add it first. Skipping.`
        );
      }
      totalCount++;
    } else {
      notes.push(
        `Rights transactions: Portfolio ${portfolioData.data[13]} doesn't exist. Add it first. Skipping.`
      );
    }
  });
  console.log(`Imported ${importedCount} rights transactions`);
  return { importedCount, totalCount, notes };
}

export function importDividendsTransactions(dividends: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

  console.log("Importing dividends transactions: ", dividends.length);
  dividends.forEach((portfolioData: any) => {
    const portfolio = PortfolioService.getByName(portfolioData.data[12]);
    if (portfolio) {
      const company = CompanyService.getByTickerPortfolio(
        portfolioData.data[11],
        portfolio.id
      );
      if (company) {
        const transaction: DividendsTransactionFormProps = {
          count: portfolioData.data[1],
          price: portfolioData.data[2],
          commission: portfolioData.data[3],
          color: portfolioData.data[4],
          transactionDate: portfolioData.data[5],
          exchangeRate: portfolioData.data[6],
          notes: portfolioData.data[7],
          companyId: company.id
        };
        DividendsTransactionsService.create(transaction);
      } else {
        notes.push(
          `Dividends transactions: Company ${portfolioData.data[11]} doesn't exist. Add it first. Skipping.`
        );
      }
      totalCount++;
    } else {
      notes.push(
        `Dividends transactions: Portfolio ${portfolioData.data[12]} doesn't exist. Add it first. Skipping.`
      );
    }
  });
  console.log(`Imported ${importedCount} dividends transactions`);
  return { importedCount, totalCount, notes };
}

export function importInflations(inflations: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

  inflations.forEach((inflationData: any) => {
    const inflation: InflationFormFields = {
      year: inflationData.data[1],
      percentage: inflationData.data[2]
    };
    const exists = InflationService.getByYear(inflation.year);
    if (exists === undefined) {
      InflationService.add(inflation);
      importedCount++;
    } else {
      notes.push(`Inflations: Year ${inflation.year} already exist. Skipping.`);
    }
    totalCount++;
  });
  console.log(`Imported ${importedCount} inflations`);
  return { importedCount, totalCount, notes };
}

export function importStockPrices(dividends: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  let notes: string[] = [];

  console.log("Importing stock prices: ", dividends.length);
  dividends.forEach((portfolioData: any) => {
    const portfolio = PortfolioService.getByName(portfolioData.data[5]);
    if (portfolio) {
      const company = CompanyService.getByTickerPortfolio(
        portfolioData.data[4],
        portfolio.id
      );
      if (company) {
        const transaction: StockPriceFormProps = {
          price: portfolioData.data[1],
          exchangeRate: portfolioData.data[2],
          transactionDate: portfolioData.data[3],
          companyId: company.id
        };
        StockPriceService.add(transaction);
        importedCount++;
      } else {
        notes.push(
          `Stock prices: Company ${portfolioData.data[4]} doesn't exist. Add it first. Skipping.`
        );
      }
    } else {
      notes.push(
        `Stock prices: Portfolio ${portfolioData.data[5]} doesn't exist. Add it first. Skipping.`
      );
    }
    totalCount++;
  });
  console.log(`Imported ${importedCount} stock prices`);
  return { importedCount, totalCount, notes };
}

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
  return { importedCount, totalCount };
}

export function importMarkets(markets: any[]) {
  let importedCount = 0;
  let totalCount = 0;
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
    totalCount++;
  });
  console.log(`Imported ${importedCount} markets`);
  return { importedCount, totalCount };
}

export function importCurrencies(currencies: any[]) {
  let importedCount = 0;
  let totalCount = 0;
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
    totalCount++;
  });
  console.log(`Imported ${importedCount} currencies`);
  return { importedCount, totalCount };
}
export function importPortfolios(portfolios: any[]) {
  let importedCount = 0;
  let totalCount = 0;
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
      totalCount++;
    }
  });
  console.log(`Imported ${importedCount} portfolios`);
  return { importedCount, totalCount };
}

export function importCompanies(companies: any[]) {
  let importedCount = 0;
  let totalCount = 0;
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
      totalCount++;
    }
  });
  console.log(`Imported ${importedCount} companies`);
  return { importedCount, totalCount };
}

export function importSharesTransactions(shares: any[]) {
  let importedCount = 0;
  let totalCount = 0;
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
      totalCount++;
    }
  });
  console.log(`Imported ${importedCount} shares transactions`);
  return { importedCount, totalCount };
}

export function importRightsTransactions(rights: any[]) {
  let importedCount = 0;
  let totalCount = 0;
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
      totalCount++;
    }
  });
  console.log(`Imported ${importedCount} rights transactions`);
  return { importedCount, totalCount };
}

export function importDividendsTransactions(dividends: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  console.log("Importing dividends transactions: ", dividends.length)
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
        importedCount++;
      }
    }
    totalCount++;
  });
  console.log(`Imported ${importedCount} dividends transactions`);
  return { importedCount, totalCount };
}

export function importInflations(inflations: any[]) {
  let importedCount = 0;
  let totalCount = 0;
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
    totalCount++;
  });
  console.log(`Imported ${importedCount} inflations`);
  return { importedCount, totalCount };
}


export function importStockPrices(dividends: any[]) {
  let importedCount = 0;
  let totalCount = 0;
  console.log("Importing stock prices: ", dividends.length)
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
      }
    }
    totalCount++;
  });
  console.log(`Imported ${importedCount} stock prices`);
  return { importedCount, totalCount };
}
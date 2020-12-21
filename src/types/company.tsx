export interface CompanyFields {
  id: string;
  name: string;
  ticker: string;
  url: string;
  description: string;
  currency: string;
  market: string;
  sector: string;
  color: string;
  portfolio: string;
  portfolioName: string;
  currencyName: string;
  currencySymbol: string;
}

export interface CompanyItemProps {
  id?: string;
  name: string;
  ticker: string;
  url: string;
  description: string;
  currency: string;
  market: string;
  sector: string;
  portfolio: string;
  color: string;
  portfolioName?: string;
  currencyName?: string;
  sectorName?: string;
  currencySymbol?: string;
  buySharesNumber?: number;
  buyTotal?: number;
  buyCommission?: number;
  sellSharesNumber?: number;
  sellTotal?: number;
  sellCommission?: number;
  lastOperationDate?: string;
}

export interface YearlyOperationsFields {
  year: string;
  companyId: string;
  // Shares
  investedAmount: number;
  investedAmountBaseCurrency: number;
  investmentCommission: number;
  ivestmentWithCommission: number;
  operationsCount: number;
  sellCommission: number;
  sharesBought: number;
  sharesSold: number;
  soldAmount: number;
  soldAmountBaseCurrency: number;
  // Dividends
  dividendsGross: number;
  dividendsGrossBaseCurrency: number;
  dividendsNet: number;
  // Accumulated
  accumulatedDividendsGross: number;
  accumulatedDividendsGrossBaseCurrency: number;
  accumulatedDividendsNet: number;
  accumulatedDividendsNetBaseCurrency: number;
  dividendsPerShare: number;
  dividendsCommission: number;
  // Calculated
  accumulatedInvestment: number;
  accumulatedSoldAmount: number;
  accumulatedInvestmentWithCommision: number;
  accumulatedInvestmentCommission: number;
  accumulatedSellCommission: number;
  accumulatedSharesNumber: number;
  totalInvested: number;
  averagePrice: number;
  // Calculated from stock price
  latestYearStockPrice: number;
  portfolioValue: number;
  portfolioValueWithInflation: number;
  accumulatedInflation: number;
  // Returns
  yearReturn: number;
  accumulatedReturn: number;
  returnPercentage: number;
  accumulatedReturnPercentage: number;
  dividendsReturnPercentage: number;
  yoc: number;
  rpdEmp: number;
}

export interface CompanyTotalProps {
  id: string;
  name: string;
  ticker: string;
  url: string;
  sector: string;
  currency: string;
  sharesNumber: number;
  investedAmount: number;
  averagePrice: number;
  averagePriceWithoutCommission: number;
  commission: number;
  commissionPercentage: number;
  lastStockPrice: number;
  portfolioValue: number;
  portfolioValueWithInflation: number;
  lastOperationDate: number;
  accumReturn: number;
  accumReturnPercentage: number;
  accumulatedDividendsGross: number;
  accumulatedDividendsNet: number;
  returnWithDividends: number;
  returnWithDividendsPercentage: number;
  dividendsReturnPercentage: number;
  yoc: number;
}

export interface PortfolioYearlyProps {
  id: string;
  year: string;
  portfolioId: string;
  sharesBought: number;
  sharesSold: number;
  sharesNumber: number;
  buyTotal: number;
  sellTotal: number;
  buyCommission: number;
  sellCommission: number;
  investedAmount: number;
  investmentCommission: number;
  investedWithCommission: number;
  commission: number;
  commissionPercentage: number;
  /*
  Accumulated
  */
  accumulatedSharesNumber: number;
  accumulatedInvestmentWithCommission: number;
  /*
  Calculated
  */
  portfolioValue: number;
}

export interface PortfolioYearlyFields {
  id: string;
  year: string;
  portfolioId: string;
  sharesBought: number;
  sharesSold: number;
  sharesNumber: number;
  buyTotal: number;
  sellTotal: number;
  buyCommission: number;
  sellCommission: number;
  investedAmount: number;
  investmentCommission: number;
  investedWithCommission: number;
  commission: number;
  commissionPercentage: number;
  /*
  Accumulated
  */
  accumulatedSharesNumber: number;
  accumulatedInvestmentWithCommission: number;
  /*
  Calculated
  */
  portfolioValue: number;
}

export interface YearlyTotalDictProps {
  [year: string]: PortfolioYearlyProps | {};
}

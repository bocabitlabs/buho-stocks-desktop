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
}

export interface YearlyOperationsFields {
  year: string;
  companyId: string;
  // Shares
  sharesBought: number;
  sharesSold: number;
  investedAmount: number;
  investedAmountBaseCurrency: number;
  soldAmount: number;
  soldAmountBaseCurrency: number;
  investmentCommission: number;
  sellCommission: number;
  operationsCount: number;
  // Dividends
  dividendsGross: number;
  dividendsGrossBaseCurrency: number;
  accumulatedDividendsGross: number;
  accumulatedDividendsGrossBaseCurrency: number;
  dividendsNet: number;
  accumulatedDividendsNet: number;
  accumulatedDividendsNetBaseCurrency: number;
  dividendsPerShare: number;
  dividendsCommission: number;
  // Calculated
  accumulatedInvestment: number;
  accumulatedSoldAmount: number;
  accumulatedInvestmentCommission: number;
  accumulatedSellCommission: number;
  accumulatedSharesNumber: number;
  totalInvested: number;
  averagePrice: number;
  totalInvestedWithCommission: number;
}

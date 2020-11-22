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
  buySharesCount: number;
  sellSharesCount: number;
  buyTotal: number;
  buyTotalBaseCurrency: number;
  sellTotal: number;
  sellTotalBaseCurrency: number;
  buyCommission: number;
  sellCommission: number;
  operationsCount: number;
  accumulativeBuyTotal:number;
  accumulativeSellTotal: number;
  accumulativeBuyCommission: number;
  accumulativeSellCommission: number;
  accumulativeSharesNumber: number;
  totalInvested: number;
  averagePrice: number;
  totalWithCommission: number;
  dividendsTotal: number;
  dividendsNet: number;
  dps: number;
  accumulatedDividendTotal: number;
  accumulatedDividendNet: number;
}
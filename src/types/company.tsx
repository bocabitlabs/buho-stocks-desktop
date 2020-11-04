export interface CompanyFields {
  id: string;
  name: string;
  ticker: string;
  url: string;
  description: string;
  currency: string;
  market: string;
  sector: string;
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
  portfolioName?: string;
  currencyName?: string;
  currencySymbol?: string;
  sharesNumber?: number;
  total?: number;
}
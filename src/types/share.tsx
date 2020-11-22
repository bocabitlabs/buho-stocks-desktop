enum OperationType {
  Buy,
  Sell
}

export interface ShareItemProps {
  id?: string;
  sharesNumber: number;
  priceShare: number;
  commission: number;
  type: OperationType;
  exchangeRate: number;
  operationDate: string;
  companyId: string;
  color: string;
  notes: string;
  currencyName?: string;
  currencySymbol?: string;
}

export interface ShareFields {
  id: string;
  sharesNumber: number;
  priceShare: number;
  commission: number;
  type: OperationType;
  exchangeRate: number;
  color: string;
  operationDate: string;
  companyId: string;
  notes: string;
}

export interface YearlyShareFields {
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
}
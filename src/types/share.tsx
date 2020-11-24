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
  sharesBought: number;
  sharesSold: number;
  investedAmount: number;
  investedAmountBaseCurrency: number;
  soldAmount: number;
  soldAmountBaseCurrency: number;
  investmentCommission: number;
  sellCommission: number;
  operationsCount: number;
}
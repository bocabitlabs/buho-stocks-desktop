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
  operationDate: Date;
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
  operationDate: Date;
  companyId: string;
  notes: string;
}
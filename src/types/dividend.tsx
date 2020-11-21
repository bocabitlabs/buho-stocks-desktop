export interface DividendItemProps {
  id?: string;
  sharesNumber: number;
  priceShare: number;
  commission: number;
  exchangeRate: number;
  operationDate: string;
  companyId: string;
  color: string;
  notes: string;
  currencyName?: string;
  currencySymbol?: string;
}

export interface DividendFields {
  id: string;
  sharesNumber: number;
  priceShare: number;
  commission: number;
  exchangeRate: number;
  color: string;
  operationDate: string;
  companyId: string;
  notes: string;
}
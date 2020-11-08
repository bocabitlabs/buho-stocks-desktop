export interface CurrencyFields {
  id: string;
  name: string;
  abbreviation: string;
  symbol: string;
  color: string;
  country: string;
}

export interface CurrencyItemProps {
  id?: string;
  name: string;
  color: string;
  abbreviation: string;
  symbol: string;
  country: string;
}

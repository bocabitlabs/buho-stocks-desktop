export interface CurrencyFormFields{
  name: string;
  abbreviation: string;
  symbol: string;
  color: string;
  country: string;
}

export interface ICurrency extends CurrencyFormFields{
  id: string;
}

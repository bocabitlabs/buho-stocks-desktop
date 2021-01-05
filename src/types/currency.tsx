export interface CurrencyFormFields{
  name: string;
  abbreviation: string;
  symbol: string;
  color: string;
  country: string;
}

export interface Currency extends CurrencyFormFields{
  id: string;
}

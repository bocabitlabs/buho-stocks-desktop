export interface CurrencyFields {
  id: string;
  name: string;
  abbreviation: string;
  symbol: number;
  country: string;
}

export interface CurrencyItemProps {
  id?: string;
  name: string;
  abbreviation: string;
  symbol: number;
  country: string;
}

export interface CurrencyActionProps {
  id: string;
  userId: string;
  /**
   *The type of the action
   */
  type?: string;
  /**
   * Name of the currency
   */
  name?: string;
  /**
   * Abbreviation of the currency
   */
  abbreviation?: string;
}

export interface CurrencyFields {
  id: number;
  name: string;
  abreviation: string;
}

export interface CurrencyActionProps {
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

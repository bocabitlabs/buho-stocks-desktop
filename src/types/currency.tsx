export interface CurrencyFields {
  /**
   * Internal ID of the Currency
   */
  id: string;
  /**
   * ID of the owner's user
   */
  userId: string;
  /**
   * Name of the currency: Dolar
   */
  name: string;
  /**
   * Abbreviation of the currency: USD
   */
  abreviation: string;
  /**
   * The symbol og the currency: $
   */
  symbol: string;
}

// export interface CurrencyActionProps {
//   id: string;
//   userId: string;
//   /**
//    *The type of the action
//    */
//   type?: string;
//   /**
//    * Name of the currency
//    */
//   name?: string;
//   /**
//    * Abbreviation of the currency
//    */
//   abbreviation?: string;
// }

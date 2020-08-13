import { CurrencyFields } from "../types/currency";
import { Dictionary } from "react-redux-firebase";

/**
 * Get a list of currencies from the Firestore
 *
 * @param state Redux state
 * @typeParam state Dictionary
 * @returns List of currencies
 */
export const getCurrencies = (state: {
  firestore: { ordered: { currencies: CurrencyFields[] } };
}) => state.firestore.ordered.currencies;

/**
 * Get a Currency by its ID from the Firebase Firestore. This function expects a list of currencies.
 *
 * @param state Redux state
 * @typeParam state Dictionary
 * @returns A Currency with CurrencyFields fields
 */
export const getCurrencyById = (state: {
  firestore: { data: { currencies: Dictionary<CurrencyFields> } };
}) => (id: string) =>
  state.firestore.data.currencies && state.firestore.data.currencies[id];

/**
 * Get a Currency directly from Firebase Firestore. The difference with getCurrencyById is that
 * this one expects the Currency to be directly on the `data` attribute
 *
 * @param state Redux state
 * @typeParam state Dictionary
 * @returns A Currency with CurrencyFields fields
 */
export const getCurrency = (state: {
  firestore: { data: Dictionary<CurrencyFields> };
}) => (id: string) => state.firestore.data && state.firestore.data[id];

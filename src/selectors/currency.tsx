import { CurrencyFields } from "../types/currency";
import { Dictionary } from "react-redux-firebase";

export const getFirebaseAuth = (state: { firebase: { auth: any } }) =>
  state.firebase.auth;

export const getCurrencies = (state: {
  firestore: { ordered: { currencies: CurrencyFields[] } };
}) => state.firestore.ordered.currencies;

export const getCurrencyById = (state: {
  firestore: { data: { currencies: Dictionary<CurrencyFields> } };
}) => (id: string) =>
  state.firestore.data.currencies && state.firestore.data.currencies[id];

export const getCurrency = (state: {
  firestore: { data: Dictionary<CurrencyFields> };
}) => (id: string) => state.firestore.data && state.firestore.data[id];

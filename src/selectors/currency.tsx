import { CurrencyFields } from "../types/currency";

// export const getCurrencies = (state: { currencies: CurrencyFields[] }) =>
//   state.currencies;

// export const getCurrency = (state: { firestore: { data: { currencies } } }) =>
//   data.currencies && data.currencies[id];

export const getFirebaseAuth = (state: { firebase: { auth: any } }) =>
  state.firebase.auth;

export const getCurrencies = (state: {
  firestore: { ordered: { currencies: CurrencyFields[] } };
}) => state.firestore.ordered.currencies;

export const getCurrencyById = (state: { firestore: { data: any } }) => (
  id: string
) => state.firestore.data.currencies && state.firestore.data.currencies[id];

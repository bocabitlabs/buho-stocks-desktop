import { CompanyFields } from "../types/company";
import { Dictionary } from "react-redux-firebase";

/**
 * Get a list of companies from the Firestore
 *
 * @param state Redux state
 * @typeParam state Dictionary
 * @returns List of companies
 */
export const getCompanies = (state: {
  firestore: { ordered: { companies: CompanyFields[] } };
}) => state.firestore.ordered.companies;

/**
 * Get a Currency by its ID from the Firebase Firestore. This function expects a list of companies.
 *
 * @param state Redux state
 * @typeParam state Dictionary
 * @returns A Company with CompanyFields fields
 */
export const getCompanyById = (state: {
  firestore: { data: { companies: Dictionary<CompanyFields> } };
}) => (id: string) =>
  state.firestore.data.companies && state.firestore.data.companies[id];

  /**
 * Get a Company directly from Firebase Firestore. The difference with getCurrencyById is that
 * this one expects the Company to be directly on the `data` attribute
 *
 * @param state Redux state
 * @typeParam state Dictionary
 * @returns A Company with CompanyFields fields
 */
export const getCompany = (state: {
  firestore: { data: Dictionary<CompanyFields> };
}) => (id: string) => state.firestore.data && state.firestore.data[id];

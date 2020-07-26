import { CompanyFields } from "../types/company";
import { Dictionary } from "react-redux-firebase";

export const getCompanies = (state: {
  firestore: { ordered: { companies: CompanyFields[] } };
}) => state.firestore.ordered.companies;

export const getCompanyById = (state: {
  firestore: { data: { companies: Dictionary<CompanyFields> } };
}) => (id: string) =>
  state.firestore.data.companies && state.firestore.data.companies[id];
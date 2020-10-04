import { CompanyFields } from "../types/company";

export const getCompanies = (state: {
  firestore: { ordered: { companies: CompanyFields[] } };
}) => state.firestore.ordered.companies;

export const getCompanyById = () => (id: string) => {};

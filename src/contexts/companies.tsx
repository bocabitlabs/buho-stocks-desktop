import { createContext } from "react";
import { CompanyFormFields, ICompany } from "../types/company";

export type CompaniesContextType = {
  companies: ICompany[];
  company: ICompany|null,
  isLoading: boolean;
  fetchCompanies: (portfolioId: string) => void;
  fetchCompany: (companyId: string) => void;
  addCompany: (company: CompanyFormFields) => void;
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: [],
  company: null,
  isLoading: false,
  fetchCompanies: () => null,
  fetchCompany: () => null,
  addCompany: () => null
};

export const CompaniesContext = createContext<CompaniesContextType>(
  companiesDefaultValue
);

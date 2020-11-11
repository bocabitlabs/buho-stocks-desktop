import { createContext } from "react";
import { CompanyFields } from "../types/company";

export type CompaniesContextType = {
  companies: CompanyFields[];
  company: CompanyFields|null,
  fetchCompanies: (portfolioId: string) => void;
  fetchCompany: (companyId: string) => void;
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: [],
  company: null,
  fetchCompanies: () => null,
  fetchCompany: () => null,
}

export const CompaniesContext = createContext<CompaniesContextType>(companiesDefaultValue);

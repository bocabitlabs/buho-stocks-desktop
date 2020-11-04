import { createContext } from "react";
import { CompanyFields, CompanyItemProps } from "../types/company";

export type CompaniesContextType = {
  companies: CompanyFields[];
  company: CompanyFields|null,
  isLoading: boolean;
  fetchCompanies: (portfolioId: string) => void;
  fetchCompany: (companyId: string) => void;
  addCompany: (currency: CompanyItemProps) => void;
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: [],
  company: null,
  isLoading: false,
  fetchCompanies: () => null,
  fetchCompany: () => null,
  addCompany: () => null
}

export const CompaniesContext = createContext<CompaniesContextType>(companiesDefaultValue);

import { createContext } from "react";
import { CompanyFields, CompanyItemProps } from "../types/company";

export type CompaniesContextType = {
  companies: CompanyFields[];
  isLoading: boolean;
  fetchCompanies: (portfolioId: string) => void;
  addCompany: (currency: CompanyItemProps) => void;
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: [],
  isLoading: false,
  fetchCompanies: () => null,
  addCompany: () => null
}

export const CompaniesContext = createContext<CompaniesContextType>(companiesDefaultValue);

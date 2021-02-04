import { createContext } from "react";
import { IAddProps } from "types/common";
import { CompanyFormFields, ICompany } from "../types/company";

export type CompaniesContextType = {
  companies: ICompany[];
  company: ICompany|null,
  isLoading: boolean;
  fetchCompanies: (portfolioId: string) => void;
  fetchCompany: (companyId: string) => void;
  addCompany: (company: CompanyFormFields) => IAddProps;
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: [],
  company: null,
  isLoading: false,
  fetchCompanies: () => null,
  fetchCompany: () => null,
  addCompany: () : IAddProps => ({ changes: false })
};

export const CompaniesContext = createContext<CompaniesContextType>(
  companiesDefaultValue
);

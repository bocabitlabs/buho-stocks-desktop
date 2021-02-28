import { createContext } from "react";
import { IAddProps } from "types/common";
import { CompanyFormFields, ICompany } from "types/company";

export type CompaniesContextType = {
  companies: ICompany[];
  company: ICompany | null;
  isLoading: boolean;
  fetchCompanies: (portfolioId: string) => void;
  fetchCompany: (companyId: string) => ICompany | null;
  addCompany: (company: CompanyFormFields) => IAddProps;
  update: (transactionId: string, transaction: CompanyFormFields) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: [],
  company: null,
  isLoading: false,
  fetchCompanies: () => null,
  fetchCompany: (): ICompany | null => null,
  addCompany: (): IAddProps => ({ changes: false }),
  update: () => ({changes: false}),
  deleteById: () => ({ changes: false })
};

export const CompaniesContext = createContext<CompaniesContextType>(
  companiesDefaultValue
);

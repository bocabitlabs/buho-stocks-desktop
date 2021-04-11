import { createContext } from "react";
import { IAddProps } from "types/common";
import { CompanyFormFields, ICompany } from "types/company";

export type CompaniesContextType = {
  companies: ICompany[];
  company: ICompany | null;
  isLoading: boolean;
  getAll: (portfolioId: string) => void;
  getById: (companyId: string) => ICompany | null;
  create: (company: CompanyFormFields) => IAddProps;
  update: (transactionId: string, transaction: CompanyFormFields) => IAddProps;
  deleteById: (transactionId: string) => IAddProps;
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: [],
  company: null,
  isLoading: false,
  getAll: () => null,
  getById: (): ICompany | null => null,
  create: (): IAddProps => ({ changes: false }),
  update: () => ({changes: false}),
  deleteById: () => ({ changes: false })
};

export const CompaniesContext = createContext<CompaniesContextType>(
  companiesDefaultValue
);

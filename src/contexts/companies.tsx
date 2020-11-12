import { createContext } from "react";
import { CompanyFields } from "../types/company";

export type CompaniesContextType = {
  companies: CompanyFields[];
};

export const companiesDefaultValue: CompaniesContextType = {
  companies: []
};

export const CompaniesContext = createContext<CompaniesContextType>(
  companiesDefaultValue
);
